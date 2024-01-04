import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  boards:any = [ 
    {
      id: 1,
      title: 'To do',
      color: '#009886',
      list: [
      ]
    },
    {
      id: 2,
      title: 'In Process',
      color: '#208EED',
      list: [
      ]
    },
    {
      id: 3,
      title: 'Done',
      color: '#B36619',
      list: [
      ]
    },
  ];
  constructor(
    public boardService: BoardService
  ) { }

  ngOnInit(): void {
    
    console.log('BOARD - INIT')
    this.loadCard()
  }

  onColorChange(color: string, columnId: number) {
    this.boardService.changeColumnColor(color, columnId)
  }
  
  onAddCard(text: string, columnId: any) {

    const object = {
      "typeOfJob": text,
      "Useror": 1,
      "estate":  columnId.title
  }
    this.boardService.saveRow(object)
    .subscribe(
      (data) => {
        this.loadCard();
      },
      (error) => { console.error(error) },
    )
    ;
  }

  loadCard() {


    this.boardService.getData()
      .subscribe(
        (data) => {
          this.boards[0].list= [];
          this.boards[1].list = [];
          this.boards[2].list = [];

          data.forEach(element => {
            if(element.estate == "To do"){
              this.boards[0].list.push( {
                id: element.id,
                text: element.typeOfJob,
               
              })
            }
            if(element.estate == "In Process"){
              this.boards[1].list.push( {
                id: element.id,
                text: element.typeOfJob,
               
              })
            }

            if(element.estate == "Done"){
              this.boards[2].list.push( {
                id: element.id,
                text: element.typeOfJob,
               
              })
            }


          });
          console.log(this.boards);

        },
        (error) => { console.error(error) },
      )
      ;
  }
  

  
  onDeleteCard(cardId: any, columnId: any) {

    let col = columnId.title;
    if(columnId.title == 'To do'){
      col = 'In Process' 
    }
    if(columnId.title == 'In Process'){
      col = 'Done' 
    }

    if(columnId.title == 'Done'){
      col = 'To do' 
    }

    const lop =  columnId.list.filter((item) => item.id == cardId)[0]
    let data = {
      "id": lop.id,
      "typeOfJob": lop.text,
      "Useror": 1,
      "estate":  col
    }
    this.boardService.saveRow(data)
      .subscribe(
        (data) => {
          
          this.loadCard()

        },
        (error) => { console.error(error) },
      )
      ;

  }

  onChangeLike(event: {card: any, increase: boolean}, columnId: number ) {
    const { card: { id }, increase } = event
    this.boardService.changeLike(id, columnId, increase)
  }

  onAddComment(event: {id: number, text: string}, columnId: number) {
    this.boardService.addComment(columnId, event.id, event.text)
  }
  
  onDeleteComment(comment, columnId, item) {
    this.boardService.deleteComment(columnId, item.id, comment.id)
  }

  
}
