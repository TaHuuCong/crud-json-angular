import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Editor } from '../editor';
import { MyEditorService } from '../editor.service';

@Component({
  selector: 'app-editor-detail',
  templateUrl: './editor-detail.component.html',
  styleUrls: ['./editor-detail.component.scss']
})
export class EditorDetailComponent implements OnInit {
  editor: Editor;
  operation: string;
  id: string;
  create: string;
  announcement: any;
  announcementForm: any = {
    id: '',
    title: '',
    content: ''
  };
  closeResult: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onEditorContentChange = new EventEmitter();

  // khi có embed nếu browser sử dụng addblock thì sẽ báo lỗi
  // editor
  viewEditor: any = '';
  errorEMax = false;
  errorEMin = false;
  emptyContent = true;
  editorContent = '';
  initEditor = {
    theme: 'modern',
    paste_as_text: false,
    menu: {
      file: { title: 'File', items: 'newdocument | print' },
      edit: { title: 'Edit', items: 'undo redo | selectall | searchreplace' },
      view: { title: 'View', items: 'visualaid' },
      insert: { title: 'Insert', items: 'image link media | charmap' },
      format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | removeformat' },
      table: { title: 'Table', items: 'inserttable deletetable | cell row column' }
    },
    plugins: [
      `advlist autolink lists link image table charmap searchreplace print
               code media textcolor colorpicker textpattern imagetools autoresize`
    ],
    toolbar1: `insertfile undo redo | formatselect | bold italic underline forecolor backcolor | fontsizeselect`,
    toolbar2: `alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media code | previewmenu`,
    fontsize_formats: '9px 10px 12px 13px 14px 16px 18px 24px 36px',
    // font_formats: `Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Courier New=courier new,courier;
    //                Georgia=georgia,palatino;Helvetica=helvetica;Tahoma=tahoma,arial,helvetica,sans-serif;Verdana=verdana,geneva;
    //                Roboto=roboto,sans-serif`,
    branding: false,
    link_context_toolbar: true,
    remove_linebreaks: false,
    media_live_embeds: true,
    forced_root_block: 'p',
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    autoresize_max_height: 500,
    setup: editor => {
      editor.on('keyup change', () => {
          let maxLength = 0;
          const obj = editor.getBody().childNodes;
          if (obj.length > 1) {
              // let str = '';
              for (let i = 0; i < obj.length; i++) {
                  if (true) {
                      const x = obj[i];
                      // const name = obj[i].localName;
                      const content = obj[i].innerHTML;
                      if (content.includes('data-mce-object="iframe"')) {
                          obj[i].className = 'iframe-wrapper';
                      }
                      if (content === '<br data-mce-bogus="1">') {
                          obj[i].className = '';
                      }
                      // str += `<` + name + `>` + content + `<` + name + `/>`;
                      const lengthE = obj[i].innerText.replace(/\uFEFF/g, '').length;
                      maxLength += lengthE;
                      this.emptyContent = this.emptyContent && (content === '<br data-mce-bogus="1">' || content === '');
                  }
              }
              // this.editorContent = str;
          } else {
              if (obj[0].innerHTML !== '<br>' && obj[0].innerHTML !== '<br data-mce-bogus="1">') {
                  this.emptyContent = false;
              } else {
                  this.emptyContent = true;
              }
              maxLength = obj[0].innerText.replace(/\uFEFF/g, '').length;
          }
          const length = editor.getBody().textContent.replace(/\uFEFF/g, '').length;
          if (length === 0) {
              if (this.emptyContent) {
                  this.errorEMin = true;
              } else {
                  this.errorEMin = false;
              }
          } else {
              this.errorEMin = false;
          }
          this.errorEMax = maxLength > 3000 ? true : false;
          this.onEditorContentChange.emit(length);
      });

      function preview(width1: number, height1: number, device: string) {
          return {
            title: 'Preview on ' + device,
            width: width1,
            height: height1,
            html: `<iframe src="javascript:\'\'" frameborder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation"` + `></iframe>`,
            buttons: {
                text: 'Close',
                onclick() {
                    this.parent().parent().close();
                }
            },
            onPostRender() {
                const url = 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.5.10/skins/lightgray/content.min.css';
                const h = '<base href="' + editor.documentBaseURI.getURI() + '"><link type="text/css" rel="stylesheet" href="' + url + '">';
                const style =  `<style>
                                    img {
                                        max-width: 100%;
                                        height: auto;
                                    }

                                    .iframe-wrapper {
                                        position: relative;
                                        overflow: hidden;
                                        padding-top: 56.25%;
                                    }
                                    .iframe-wrapper iframe {
                                        position: absolute;
                                        max-width: 100%;
                                        height: 100%;
                                        border: 0;
                                        left: 0;
                                        top: 0;
                                    }
                                </style>`;
                const s = `<script>
                                document.addEventListener
                                && document.addEventListener("click", function(e) {
                                    for (let elm = e.target; elm; elm = elm.parentNode) {
                                        if (elm.nodeName === "A") {
                                            e.preventDefault();
                                        }
                                    }
                                }, false);
                            </script>`;
                const r = '<!DOCTYPE html><html><head>' + h + style + '</head><body id="tinymce" class="mce-content-body ">'
                    + editor.getContent() + s + '</body></html>';
                this.getEl('body').firstChild.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(r);
                const c = this.getEl('body').firstChild.contentWindow.document;
                c.open(), c.write(r), c.close();
              }
          };
      }

      editor.addButton('previewmenu', {
          type: 'menubutton',
          text: 'Preview',
          icon: false,
          menu: [
              {
                  text: 'on iPhone 6/7/8',
                  onClick() {
                      editor.windowManager.open(preview(375, 500, 'iPhone 6/7/8'));
                  }
              },
              {
                  text: 'on iPhone 6/7/8 Plus',
                  onClick() {
                      editor.windowManager.open(preview(414, 500, 'iPhone 6/7/8 Plus'));
                  }
              },
              {
                  text: 'on iPad',
                  onClick() {
                      editor.windowManager.open(preview(768, 500, 'iPad'));
                  }
              }
          ]
      });
    }
  };

  constructor(
    private route: ActivatedRoute,
    private editorService: MyEditorService,
    private router: Router,
    private domSanitizer: DomSanitizer,
  ) {
    this.route.params.subscribe(params => {
      this.operation = params['operation'];
      this.id = params['id'];
      this.create = params['create'];

      if (this.create === 'create') {
      } else {
        if (this.operation === 'view') {
          this.editorService.getEditorById(this.id).subscribe(
            data => {
              // this.editorContent = data.content;
              this.viewEditor = this.domSanitizer.bypassSecurityTrustHtml(data.content);
              this.announcementForm = data;
            },
            error => { }
          );
        } else if (this.operation === 'edit') {
          this.editorService.getEditorById(this.id).subscribe(
            data => {
              // this.editorContent = data.content;
              this.announcementForm = data;
            },
            error => { }
          );
        } else { }
      }
    });
  }

  ngOnInit() { }

  back() {
    this.router.navigateByUrl('/editor/list');
  }

  onSave(action, form) {
    if (this.emptyContent) {
      this.errorEMin = true;
    }
    if (this.errorEMin === false && this.errorEMax === false && form.valid) {
      const title = this.announcementForm.title;
      const content = this.announcementForm.content;
      if (title) {
        this.announcementForm.title = title.trim();
      }
      // if (content) {
      //   this.announcementForm.content = this.editorContent;
      // }
      if (action === 'create') {
        this.editorService.addNewEditor(this.announcementForm).subscribe(
          data => {
            this.id = data.id;
            this.router.navigateByUrl('/editor/' + this.id + '/view');
          },
          err => { }
        );
      }
      if (action === 'edit') {
        this.editorService.updateEditor(this.announcementForm).subscribe(
          data => {
            this.router.navigateByUrl('/editor/' + data.id + '/view');
          },
          err => { }
        );
      }
    }
  }

  goEdit() {
    this.editorService.getEditorById(this.id).subscribe(data => {
      this.router.navigateByUrl('/editor/' + this.id + '/edit');
    });
  }

  handleEditor(event) { }
}
