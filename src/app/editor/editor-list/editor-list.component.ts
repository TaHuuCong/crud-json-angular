import { Component, OnInit } from '@angular/core';
import { MyEditorService } from '../editor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.scss'],
})
export class EditorListComponent implements OnInit {

  editors = [];

  constructor(
    private editorService: MyEditorService,
    private router: Router
  ) {
    editorService.getAllEditors().subscribe(
      data => this.editors = data
    );
  }

  ngOnInit() {
  }

  onCreate() {
    this.router.navigateByUrl('/editor/create');
  }

  viewEditor(id) {
    this.router.navigateByUrl('/editor/' + id + '/view');
  }

  onEdit(e, id) {
    e.stopPropagation();
    this.editorService.getEditorById(id).subscribe(data => {
      this.router.navigateByUrl('/editor/' + id + '/edit');
    });
  }

  onDelete(e, id) {
    e.stopPropagation();
    // const modalRef = this.modalService.open(EditorModalComponent, { centered: true });
    // modalRef.componentInstance.title = 'Delete';
    // modalRef.result.then(result => {
    //   if (result) {
    //     this.editorService.deleteEditor(id).subscribe(
    //       res => {
    //         this.getAllEditors();
    //       },
    //       err => {
    //         if (err.status === 400) {
    //           const { error = {} } = err;
    //           const modalRef2 = this.modalService.open(EditorModalComponent, { centered: true });
    //           modalRef2.componentInstance.title = 'Error';
    //           modalRef2.componentInstance.content = `Editor.error.${error.errorKey}`;
    //           modalRef2.result.then(res => {
    //             this.getAllEditors();
    //           });
    //         }
    //       }
    //     );
    //   }
    // });
  }
}
