import {CommonRequest, Request} from '../proto/pb/common_pb.js'
import { NormalServiceClient } from '../proto/pb/normal_grpc_web_pb.js'
import { NormalRequest, UpdateRequest, PageRequest } from '../proto/pb/normal_pb.js'
import { AnalysisServiceClient } from '../proto/pb/analysis_grpc_web_pb.js'
import { AnalysisRequest } from '../proto/pb/analysis_pb.js'
import { PublishServiceClient } from '../proto/pb/publish_grpc_web_pb.js'
import { PublishRequest } from '../proto/pb/publish_pb.js'

import {mapGetters, mapMutations} from "vuex";

import JSONEditor from '@json-editor/json-editor'


export default {
    data() {
        return {}
    },
    created() {
        this.initJsonEditor();
    },
    mounted() {
        this.normalClient = new NormalServiceClient(this.gRPC_url, null, null);
        this.analysisClient = new AnalysisServiceClient(this.gRPC_url, null, null);
        this.publishClient = new PublishServiceClient(this.gRPC_url, null, null);
    },
    computed: {
        gRPC_url: {
            get() {
                return this.getSetting.gRPC_url
            },
        },
        alertMessage: {
            get() {
                return this.getSetting.alertMessage
            },
            set(value) {
                this.changeSetting({name: 'alertMessage', value})
            }
        },
        isErrorAlert: {
            get() {
                return this.getSetting.isErrorAlert;
            },
            set(value) {
                this.changeSetting({name: 'isErrorAlert', value})
            }
        },
        userId: {
            get () { return this.getSetting.userId },
        },
        cId: {
            get () { return this.getSetting.cId },
        },
        applicationObj: {
            get () { return this.getSetting.applicationObj },
        },
        ...mapGetters(['getSetting'])
    },
    methods: {
        ...mapMutations(['changeSetting']),

        // 得到JSON文件的对象
        getJSON(path, success, fail = () => {}) {
            let self = this;
            let request = new NormalRequest();

            request.setPath(path);

            request = this.addCommonRequest(request);
            this.normalClient.getJSON(request, {}, (err, response) => {
                self.doFilter(err, response, suc => {
                    // this.$log(`data: ${suc.getData()}`);
                    let data = suc.getData();
                    if (data == '') {
                        success();
                    } else {
                        success(JSON.parse(suc.getData()));
                    }

                }, () => {
                    this.loadFileError(path);
                    fail();
                })
            })
        },

        getJSONPromise(path) {

        },

        // 得到Schema文件对象
        getSchema(path, success, fail = () => {}) {
            let self = this;
            let request = new NormalRequest();

            request.setPath(path);
            request = this.addCommonRequest(request);
            this.normalClient.getSchema(request, {}, (err, response) => {
                self.doFilter(err, response, suc => {
                    success(JSON.parse(suc.getData()));
                }, () => {
                    this.loadFileError(path);
                    fail();
                })
            })
        },

        async getSchemaPromise(path) {

            let self = this;
            let request = new NormalRequest();

            request.setPath(path);

            request = this.addCommonRequest(request);

            return new Promise((resolve, reject) => {
                this.normalClient.getSchema(request, {}, (err, response) => {
                    self.doFilter(err, response, suc => {
                        resolve(JSON.parse(suc.getData()));
                    }, () => {
                        this.loadFileError(path);
                        reject();
                    })
                })
            })
        },

        // 更新JSON文件
        updateJSON(path, dataObj, success, fail = () => {}) {
            let self = this;
            let request = new NormalRequest();

            request.setPath(path);
            request.setData(JSON.stringify(dataObj));

            request = this.addCommonRequest(request);
            this.normalClient.updateJSON(request, {}, (err, response) => {
                self.doFilter(err, response, success, fail)
            })
        },

        // 得到分页数据
        getPageList(path, page, pageSize, success, fail = () => {}) {
            let self = this;
            let request = new PageRequest();

            request.setPath(path);
            request.setPage(page);
            request.setPagesize(pageSize);

            request = this.addCommonRequest(request);
            this.normalClient.getPageList(request, {}, (err, response) => {
                self.doFilter(err, response, suc => {
                    success(JSON.parse(suc.getData()))
                }, () => {
                    // this.$log(`getPageList: path: ${path}`);
                    this.loadFileError(path);
                    fail();
                })
            })
        },

        // 得到对应索引的数据
        getIndexList(path, dataObj, success, fail = () => {}) {
            let self = this;
            let request = new NormalRequest();

            request.setPath(path);
            request.setData(JSON.stringify(dataObj));

            request = this.addCommonRequest(request);
            this.normalClient.getIndexList(request, {}, (err, response) => {
                self.doFilter(err, response, suc => {
                    success(JSON.parse(suc.getData()))
                }, () => {
                    this.loadFileError(path);
                    fail();
                })
            })
        },

        // 更新列表数据
        updateList(path, type, dataObj, success, fail = () => {}) {
            let self = this;
            let request = new UpdateRequest();

            request.setPath(path);
            request.setType(type);
            request.setData(JSON.stringify(dataObj));

            request = this.addCommonRequest(request);
            this.normalClient.updateList(request, {}, (err, response) => {
                self.doFilter(err, response, suc => {
                    success(suc.getData());
                }, fail);
            })
        },


        // 分析服务交易
        AnalysisQry(url, flag, date, success, fail = () => {}) {
            let self = this;
            let request = new AnalysisRequest();

            request.setUrl(url);
            request.setFlag(flag);
            request.setDate(date);
            request.setKey(this.applicationObj.key);

            request = this.addCommonRequest(request);
            this.analysisClient.requestQry(request, {}, (err, response) => {
                self.doFilter(err, response, suc => {
                    success(JSON.parse(suc.getJsonstr()));
                }, fail);
            })
        },

        // publish
        updatePublish(type, dataObj, success, fail = () => {})  {
            let self = this;
            let request = new PublishRequest();

            request.setType(type);
            request.setData(JSON.stringify(dataObj));

            request = this.addCommonRequest(request);
            this.publishClient.publish(request, {}, (err, response) => {
                self.doFilter(err, response, success, fail);
            })
        },

        checkFailedError(schema, errors) {

            function formatError(errorList) {
                let error = "";
                for (let i in errorList) {
                    let path = errorList[i].path;
                    let message = errorList[i].message;
                    error += path + ': ' + message + '\n'
                }
                return error;
            }
            this.showError(formatError(errors));
            // this.showError("校验不通过，请检查输入的数据是否有误！");
        },

        showError(errorMessage) {
            this.alertMessage = errorMessage;
            this.isErrorAlert = true;
        },
        //
        loadFileError(filePath) {
            // this.$log(`path: ${filePath}`);
            this.alertMessage = "文件加载失败：" + filePath;
            this.isErrorAlert = true;
        },

        // gRPC 添加公共请求参数
        addCommonRequest(filterRequest) {
            let commonRequest = {};
            if (filterRequest == undefined) {
                commonRequest = new CommonRequest();
            } else {
                commonRequest = filterRequest;
            }
            let request = new Request();
            request.setUserid(this.userId);
            request.setCid(this.cId);
            if (this.applicationObj && this.applicationObj.appId) {
                request.setAppid(this.applicationObj.appId);
            }
            if (this.$route.path) {
                request.setMenuid(this.$route.path.substr(1));
            }
            commonRequest.setRequest(request);
            return commonRequest;
        },

        // gRPC 公共响应处理
        doFilter(err, response, successCallback, failCallback, options) {

            let optionsList = {
                showErrorAlert: true    // 默认显示公共错误弹窗
            };
            if (options !== undefined) {
                optionsList = {
                    showErrorAlert: options.showErrorAlert !== undefined
                        ? options.showErrorAlert : optionsList.showErrorAlert
                }
            }

            // 公共请求处理
            // let result = response.getResult();

            if (err || response.getResult().getCode() !== 1) {

                let message = err ? '服务器错误: ' + err.code + ' "' + err.message + '"'
                    : '接口错误：' + response.getResult().getCode() + ' "' + response.getResult().getMessage() + '"';
                let alertMessage = err ? err.message : response.getResult().getMessage();

                if (optionsList.showErrorAlert) {
                    this.alertMessage = alertMessage;
                    this.isErrorAlert = true;
                }
                failCallback(response, alertMessage);
            } else {
                successCallback(response);
            }
        },

        initJsonEditor() {
            // 初始化主题
            this.customEditorTheme();
            this.customEditorString();
            this.customEditorValidate();
        },

        customEditorTheme() {
            // 默认的bootstrap4主题
            JSONEditor.defaults.themes.myTheme = JSONEditor.defaults.themes.bootstrap4.extend({
                // 修改默认主题的方法
                getIndentedPanel: function() {
                    var el = document.createElement("div");
                    el.classList.add('card', 'card-body'); // , 'border-primary'
                    return el;
                },
                // 新增实现抽象主题的方法
                getHeader: function(text) {
                    var el = document.createElement('h3');
                    if(typeof text === "string") {
                        el.textContent = text;
                    }
                    else {
                        el.appendChild(text);
                    }

                    return el;
                },
                getFormControl: function(label, input, description, infoButton) {
                    var group = document.createElement("div");

                    if (label && input.type === "checkbox") {
                        group.classList.add("checkbox");
                        label.appendChild(input);
                        label.style.fontSize = "14px";
                        group.style.marginTop = "0";
                        group.appendChild(label);
                        input.style.position = "relative";
                        input.style.cssFloat = "left";
                        input.style.marginTop = "4px";
                        input.style.marginRight = "6px";
                    } else {
                        group.classList.add("form-group");
                        if (label) {
                            label.classList.add("form-control-label");
                            group.appendChild(label);
                        }
                        let row = document.createElement('div');
                        row.style.display = 'flex';
                        row.appendChild(input);
                        if (infoButton) {
                            row.appendChild(infoButton);
                        }
                        group.appendChild(row);
                    }

                    if (description) group.appendChild(description);

                    return group;
                },

                // getFormControl: function(label, input, description) {
                //     var group = document.createElement("div");
                //
                //     if (label && input.type === "checkbox") {
                //         group.classList.add("checkbox");
                //         label.appendChild(input);
                //         label.style.fontSize = "14px";
                //         group.style.marginTop = "0";
                //         group.appendChild(label);
                //         input.style.position = "relative";
                //         input.style.cssFloat = "left";
                //
                //         if (description) group.appendChild(description);
                //
                //     } else {
                //         let layout = document.createElement('div');
                //         let right = document.createElement('div');
                //         let left = document.createElement('div');
                //         layout.classList.add('row', 'mt-2', 'mb-2');
                //
                //         if (label) {
                //             left.appendChild(label);
                //             left.classList.add('col-2', 'text-right', 'p-0');
                //             left.style.lineHeight = '35px';
                //
                //             layout.appendChild(left);
                //         }
                //
                //         right.classList.add('col');
                //         right.appendChild(input);
                //
                //         if (description) right.appendChild(description);
                //
                //         layout.appendChild(right);
                //         group.appendChild(layout);
                //     }
                //
                //
                //     return group;
                // },

                getInput() {
                    return document.createElement('b-input');
                }
            });
        },

        customEditorTable() {

            JSONEditor.defaults.editors.table = JSONEditor.defaults.editors.table.extend({
                addControls: function() {
                    var self = this;

                    this.collapsed = false;
                    this.toggle_button = this.getButton('','collapse',this.translate('button_collapse'));
                    this.toggle_button.classList.add('json-editor-btntype-toggle');
                    if(this.title_controls) {
                        this.title_controls.appendChild(this.toggle_button);
                        this.toggle_button.addEventListener('click',function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            if(self.collapsed) {
                                self.collapsed = false;
                                self.panel.style.display = '';
                                self.setButtonText(this,'','collapse',self.translate('button_collapse'));
                            }
                            else {
                                self.collapsed = true;
                                self.panel.style.display = 'none';
                                self.setButtonText(this,'','expand',self.translate('button_expand'));
                            }
                        });

                        // If it should start collapsed
                        if(this.options.collapsed) {
                            $trigger(this.toggle_button,'click');
                        }

                        // Collapse button disabled
                        if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
                            if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
                        }
                        else if(this.jsoneditor.options.disable_collapse) {
                            this.toggle_button.style.display = 'none';
                        }
                    }

                    // Add "new row" and "delete last" buttons below editor
                    this.add_row_button = this.getButton(this.getItemTitle(),'add',this.translate('button_add_row_title',[this.getItemTitle()]));
                    this.add_row_button.classList.add('json-editor-btntype-add');
                    // 修改新增按钮的监听事件
                    this.add_row_button.addEventListener('click',function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        // console.log("add row");
                        self.addRow();
                        self.refreshValue();
                        self.refreshRowButtons();
                        self.onChange(true);
                    });
                    self.controls.appendChild(this.add_row_button);

                    this.delete_last_row_button = this.getButton(this.translate('button_delete_last',[this.getItemTitle()]),'delete',this.translate('button_delete_last_title',[this.getItemTitle()]));
                    this.delete_last_row_button.classList.add('json-editor-btntype-deletelast');
                    this.delete_last_row_button.addEventListener('click',function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!self.askConfirmation()) {
                            return false;
                        }

                        var rows = self.getValue();
                        rows.pop();
                        self.setValue(rows);
                        self.onChange(true);
                    });
                    self.controls.appendChild(this.delete_last_row_button);

                    this.remove_all_rows_button = this.getButton(this.translate('button_delete_all'),'delete',this.translate('button_delete_all_title'));
                    this.remove_all_rows_button.classList.add('json-editor-btntype-deleteall');
                    this.remove_all_rows_button.addEventListener('click',function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!self.askConfirmation()) {
                            return false;
                        }

                        self.setValue([]);
                        self.onChange(true);
                    });
                    self.controls.appendChild(this.remove_all_rows_button);
                }
            });
        },
         customEditorString() {
             JSONEditor.defaults.editors.string = JSONEditor.defaults.editors.string.extend({
                 build: function() {
                     var self = this, i;
                     if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
                     if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
                     if(this.options.infoText) this.infoButton = this.theme.getInfoButton(this.options.infoText);

                     this.format = this.schema.format;
                     if(!this.format && this.schema.media && this.schema.media.type) {
                         this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g,'');
                     }
                     if(!this.format && this.options.default_format) {
                         this.format = this.options.default_format;
                     }
                     if(this.options.format) {
                         this.format = this.options.format;
                     }

                     // Specific format
                     if(this.format) {
                         // Text Area
                         if(this.format === 'textarea') {
                             this.input_type = 'textarea';
                             this.input = this.theme.getTextareaInput();
                         }
                         // Range Input
                         else if(this.format === 'range') {
                             this.input_type = 'range';
                             var min = this.schema.minimum || 0;
                             var max = this.schema.maximum || Math.max(100,min+1);
                             var step = 1;
                             if(this.schema.multipleOf) {
                                 if(min%this.schema.multipleOf) min = Math.ceil(min/this.schema.multipleOf)*this.schema.multipleOf;
                                 if(max%this.schema.multipleOf) max = Math.floor(max/this.schema.multipleOf)*this.schema.multipleOf;
                                 step = this.schema.multipleOf;
                             }

                             this.input = this.theme.getRangeInput(min,max,step);
                         }
                         // 自定义format=filechoose格式的布局
                         else if (this.format === 'file-choose') {
                             this.input_type = 'url';
                             this.input = this.theme.getFormInputField('text');
                             this.input.classList.add('col');

                             this.infoButton = this.theme.getButton('选择图片路径');
                             this.infoButton.style.marginLeft = '10px';
                             this.infoButton.addEventListener("click", function () {
                                 self.jsoneditor.options.filechooseClick(function (url) {
                                     self.input.value = url;
                                     self.refreshValue();
                                     self.is_dirty = true;
                                     self.onChange(true);
                                 });
                             });
                         }
                         // Source Code
                         else if([
                             'actionscript',
                             'batchfile',
                             'bbcode',
                             'c',
                             'c++',
                             'cpp',
                             'coffee',
                             'csharp',
                             'css',
                             'dart',
                             'django',
                             'ejs',
                             'erlang',
                             'golang',
                             'groovy',
                             'handlebars',
                             'haskell',
                             'haxe',
                             'html',
                             'ini',
                             'jade',
                             'java',
                             'javascript',
                             'json',
                             'less',
                             'lisp',
                             'lua',
                             'makefile',
                             'markdown',
                             'matlab',
                             'mysql',
                             'objectivec',
                             'pascal',
                             'perl',
                             'pgsql',
                             'php',
                             'python',
                             'r',
                             'ruby',
                             'sass',
                             'scala',
                             'scss',
                             'smarty',
                             'sql',
                             'sqlserver',
                             'stylus',
                             'svg',
                             'twig',
                             'vbscript',
                             'xml',
                             'yaml'
                         ].indexOf(this.format) >= 0
                         ) {
                             this.input_type = this.format;
                             this.source_code = true;

                             this.input = this.theme.getTextareaInput();
                         }
                         // HTML5 Input type
                         else {
                             this.input_type = this.format;
                             this.input = this.theme.getFormInputField(this.input_type);
                         }
                     }
                     // Normal text input
                     else {
                         this.input_type = 'text';
                         this.input = this.theme.getFormInputField(this.input_type);
                     }

                     // minLength, maxLength, and pattern
                     if(typeof this.schema.maxLength !== "undefined") this.input.setAttribute('maxlength',this.schema.maxLength);
                     if(typeof this.schema.pattern !== "undefined") this.input.setAttribute('pattern',this.schema.pattern);
                     else if(typeof this.schema.minLength !== "undefined") this.input.setAttribute('pattern','.{'+this.schema.minLength+',}');

                     if(this.options.compact) {
                         this.container.classList.add('compact');
                     }
                     else {
                         if(this.options.input_width) this.input.style.width = this.options.input_width;
                     }

                     if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
                         this.always_disabled = true;
                         this.input.setAttribute('readonly', 'true');
                     }

                     // Set custom attributes on input element. Parameter is array of protected keys. Empty array if none.
                     this.setInputAttributes(['maxlength', 'pattern', 'readonly', 'min', 'max', 'step']);

                     this.input
                         .addEventListener('change',function(e) {
                             e.preventDefault();
                             e.stopPropagation();

                             // Don't allow changing if this field is a template
                             if(self.schema.template) {
                                 this.value = self.value;
                                 return;
                             }

                             var val = this.value;

                             // sanitize value
                             var sanitized = self.sanitize(val);
                             if(val !== sanitized) {
                                 this.value = sanitized;
                             }

                             self.is_dirty = true;

                             self.refreshValue();
                             self.onChange(true);
                         });

                     if(this.options.input_height) this.input.style.height = this.options.input_height;
                     if(this.options.expand_height) {
                         this.adjust_height = function(el) {
                             if(!el) return;
                             var i, ch=el.offsetHeight;
                             // Input too short
                             if(el.offsetHeight < el.scrollHeight) {
                                 i=0;
                                 while(el.offsetHeight < el.scrollHeight+3) {
                                     if(i>100) break;
                                     i++;
                                     ch++;
                                     el.style.height = ch+'px';
                                 }
                             }
                             else {
                                 i=0;
                                 while(el.offsetHeight >= el.scrollHeight+3) {
                                     if(i>100) break;
                                     i++;
                                     ch--;
                                     el.style.height = ch+'px';
                                 }
                                 el.style.height = (ch+1)+'px';
                             }
                         };

                         this.input.addEventListener('keyup',function(e) {
                             self.adjust_height(this);
                         });
                         this.input.addEventListener('change',function(e) {
                             self.adjust_height(this);
                         });
                         this.adjust_height();
                     }

                     if(this.format) this.input.setAttribute('data-schemaformat',this.format);

                     this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton);

                     // output element to display the range value when it changes or have default.
                     if(this.format === 'range') {
                         var output = document.createElement('output');
                         output.setAttribute('class', 'range-output');
                         this.control.appendChild(output);
                         output.value = this.schema.group;
                         this.input.addEventListener('change', function () {
                             output.value = self.input.value;
                         });
                         this.input.addEventListener('input', function () {
                             output.value = self.input.value;
                         });
                     }

                     this.container.appendChild(this.control);

                     // Any special formatting that needs to happen after the input is added to the dom
                     window.requestAnimationFrame(function() {
                         // Skip in case the input is only a temporary editor,
                         // otherwise, in the case of an ace_editor creation,
                         // it will generate an error trying to append it to the missing parentNode
                         if(self.input.parentNode) self.afterInputReady();
                         if(self.adjust_height) self.adjust_height(self.input);
                     });

                     // Compile and store the template
                     if(this.schema.template) {
                         this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine);
                         this.refreshValue();
                     }
                     else {
                         this.refreshValue();
                     }
                 },
             });

             let self = this;
             JSONEditor.defaults.options.filechooseClick = function(callback){
                 window.filechooseCallBack = callback;
                 self.$store.commit('showHover', 'filechoose');
             };
         },

         customEditorValidate() {
             JSONEditor.defaults.languages.zh = {
                 /**
                  * When a property is not set
                  */
                 error_notset: "属性没有设置",
                 /**
                  * When a string must not be empty
                  */
                 error_notempty: "值不能为空",
                 /**
                  * When a value is not one of the enumerated values
                  */
                 error_enum: "Value must be one of the enumerated values",
                 /**
                  * When a value doesn't validate any schema of a 'anyOf' combination
                  */
                 error_anyOf: "Value must validate against at least one of the provided schemas",
                 /**
                  * When a value doesn't validate
                  * @variables This key takes one variable: The number of schemas the value does not validate
                  */
                 error_oneOf: 'Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.',
                 /**
                  * When a value does not validate a 'not' schema
                  */
                 error_not: "Value must not validate against the provided schema",
                 /**
                  * When a value does not match any of the provided types
                  */
                 error_type_union: "Value must be one of the provided types",
                 /**
                  * When a value does not match the given type
                  * @variables This key takes one variable: The type the value should be of
                  */
                 error_type: "Value must be of type {{0}}",
                 /**
                  *  When the value validates one of the disallowed types
                  */
                 error_disallow_union: "Value must not be one of the provided disallowed types",
                 /**
                  *  When the value validates a disallowed type
                  * @variables This key takes one variable: The type the value should not be of
                  */
                 error_disallow: "Value must not be of type {{0}}",
                 /**
                  * When a value is not a multiple of or divisible by a given number
                  * @variables This key takes one variable: The number mentioned above
                  */
                 error_multipleOf: "Value must be a multiple of {{0}}",
                 /**
                  * When a value is greater than it's supposed to be (exclusive)
                  * @variables This key takes one variable: The maximum
                  */
                 error_maximum_excl: "Value must be less than {{0}}",
                 /**
                  * When a value is greater than it's supposed to be (inclusive
                  * @variables This key takes one variable: The maximum
                  */
                 error_maximum_incl: "Value must be at most {{0}}",
                 /**
                  * When a value is lesser than it's supposed to be (exclusive)
                  * @variables This key takes one variable: The minimum
                  */
                 error_minimum_excl: "Value must be greater than {{0}}",
                 /**
                  * When a value is lesser than it's supposed to be (inclusive)
                  * @variables This key takes one variable: The minimum
                  */
                 error_minimum_incl: "Value must be at least {{0}}",
                 /**
                  * When a value have too many characters
                  * @variables This key takes one variable: The maximum character count
                  */
                 error_maxLength: "值必须至多为{{0}}个汉字或字符",
                 /**
                  * When a value does not have enough characters
                  * @variables This key takes one variable: The minimum character count
                  */
                 error_minLength: "值必须至少为{{0}}个汉字或字符",
                 /**
                  * When a value does not match a given pattern
                  */
                 error_pattern: "Value must match the pattern {{0}}",
                 /**
                  * When an array has additional items whereas it is not supposed to
                  */
                 error_additionalItems: "No additional items allowed in this array",
                 /**
                  * When there are to many items in an array
                  * @variables This key takes one variable: The maximum item count
                  */
                 error_maxItems: "Value must have at most {{0}} items",
                 /**
                  * When there are not enough items in an array
                  * @variables This key takes one variable: The minimum item count
                  */
                 error_minItems: "Value must have at least {{0}} items",
                 /**
                  * When an array is supposed to have unique items but has duplicates
                  */
                 error_uniqueItems: "Array must have unique items",
                 /**
                  * When there are too many properties in an object
                  * @variables This key takes one variable: The maximum property count
                  */
                 error_maxProperties: "Object must have at most {{0}} properties",
                 /**
                  * When there are not enough properties in an object
                  * @variables This key takes one variable: The minimum property count
                  */
                 error_minProperties: "Object must have at least {{0}} properties",
                 /**
                  * When a required property is not defined
                  * @variables This key takes one variable: The name of the missing property
                  */
                 error_required: "Object is missing the required property '{{0}}'",
                 /**
                  * When there is an additional property is set whereas there should be none
                  * @variables This key takes one variable: The name of the additional property
                  */
                 error_additional_properties: "No additional properties allowed, but property {{0}} is set",
                 /**
                  * When a dependency is not resolved
                  * @variables This key takes one variable: The name of the missing property for the dependency
                  */
                 error_dependency: "Must have property {{0}}",
                 /**
                  * When a date is in incorrect format
                  * @variables This key takes one variable: The valid format
                  */
                 error_date: 'Date must be in the format {{0}}',
                 /**
                  * When a time is in incorrect format
                  * @variables This key takes one variable: The valid format
                  */
                 error_time: 'Time must be in the format {{0}}',
                 /**
                  * When a datetime-local is in incorrect format
                  * @variables This key takes one variable: The valid format
                  */
                 error_datetime_local: 'Datetime must be in the format {{0}}',
                 /**
                  * When a integer date is less than 1 January 1970
                  */
                 error_invalid_epoch: 'Date must be greater than 1 January 1970',

                 /**
                  * Text on Delete All buttons
                  */
                 button_delete_all: "All",
                 /**
                  * Title on Delete All buttons
                  */
                 button_delete_all_title: "Delete All",
                 /**
                  * Text on Delete Last buttons
                  * @variable This key takes one variable: The title of object to delete
                  */
                 button_delete_last: "Last {{0}}",
                 /**
                  * Title on Delete Last buttons
                  * @variable This key takes one variable: The title of object to delete
                  */
                 button_delete_last_title: "Delete Last {{0}}",
                 /**
                  * Title on Add Row buttons
                  * @variable This key takes one variable: The title of object to add
                  */
                 button_add_row_title: "Add {{0}}",
                 /**
                  * Title on Move Down buttons
                  */
                 button_move_down_title: "Move down",
                 /**
                  * Title on Move Up buttons
                  */
                 button_move_up_title: "Move up",
                 /**
                  * Title on Delete Row buttons
                  * @variable This key takes one variable: The title of object to delete
                  */
                 button_delete_row_title: "Delete {{0}}",
                 /**
                  * Title on Delete Row buttons, short version (no parameter with the object title)
                  */
                 button_delete_row_title_short: "Delete",
                 /**
                  * Title on Collapse buttons
                  */
                 button_collapse: "Collapse",
                 /**
                  * Title on Expand buttons
                  */
                 button_expand: "Expand",
                 /**
                  * Title on Flatpickr toggle buttons
                  */
                 flatpickr_toggle_button: "Toggle",
                 /**
                  * Title on Flatpickr clear buttons
                  */
                 flatpickr_clear_button: "Clear"
             };
             JSONEditor.defaults.default_language = 'zh';
             JSONEditor.defaults.language = JSONEditor.defaults.default_language;
         }
    }
}
