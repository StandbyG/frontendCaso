

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
}

export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
}

const TREE_DATA = {
    'Groceries': {
      'Almond Meal flour': null,
      'Organic eggs': null,
      'Protein Powder': null,
      'Fruits': {
        'Apple': null,
        'Berries': ['Blueberry', 'Raspberry'],
        'Orange': null
      }
    },
    'Reminders': [
      'Cook dinner',
      'Read the Material Design spec',
      'Upgrade Application to Angular'
    ],
    'Maintenances':{
        'Users':null,
        'Roles':{
            'Create':null,
            'Refresh':null,
            'prueba':null,
            'prueba2':{
                "hijo1":null,
                "hijo2":["1","2","3"]
            }
        },
        'Settings':null,
    }
};

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);
    this.dataChange.next(data);
  }

  
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
        /* console.log('key: ', key);
        console.log('obj: ', obj);
        console.log('level: ', level);
        console.log('============================'); */


      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }


  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}