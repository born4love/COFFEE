/**
 * Created by dean on 16-8-17.
 * 简单js分页,支持ajax异步数据请求
 * USAGE:
 *
 <!--pagination template-->    // 定义ajax返回数据渲染模板
 <textarea id="pagination_template"> // 使用一个不可见的textarea存放模板数据
 <tr key="props"> // key的值表示后端ajax返回数据的索引，该索引的值是列表数据
 <td>{{prop_id}}</td> // 大括号括起来的是需要渲染的后端数据的键
 <td>{{prop_type}}</td>
 <td>{{region}}</td>
 <td>{{block}}</td>
 <td>{{community_name}}</td>
 <td>{{user_name}}</td>
 <td>{{user_mobile}}</td>
 <td>{{create_time}}</td>
 <td>{{prop_state}}</td>
 <td><a href="{{view_url}}">查看</a></button></td>
 </tr>
 </textarea>
 <!--pagination template-->
 
 <div id="pagination">
 <script>
 // 分页参数，控制分页的行为和样式
 var params = {
                // 分页数据外层元素,放置分页按钮的地方
                'paginationWrap' : 'pagination',
                // 当前页码
                'page' : 2,
                // 数据总数
                'total' : 10,
                // 每页显示条数
                'limit' : 3,
                // 列表数据外层元素,放置ajax返回数据的地方
                'dataWrap' : 'list_wrap',
                // 分页模板元素
                'template' : 'pagination_template',
                // ajax请求地址
                'requestUrl' : '/entrust/battleax/realHouseList/',
                // 额外url参数
                'requestAddition' : []
            };
 new SimplePagination(params);
 </script>
 </div>
 */
// based on jquery
var SimplePagination = function(options){
    var Pagination = {
        // 默认参数
        settings : {
            // 分页数据外层元素,放置分页按钮的地方
            'paginationWrap': 'pagination',
            // 当前页码
            'page': 1,
            // 每页显示条数
            'limit': 3
        },
        // 错误返回对象
        error : {'code': 0, 'msg': ''},
        // 必须的参数
        requiredParams : ['total', 'dataWrap', 'template', 'requestUrl'],
        // 必须存在的DOM对象
        requiredElement : ['paginationWrap', 'dataWrap', 'template'],
        // 分页元素
        pageItems : {
            wrap : '<ul class="pagination"></ul>',
            pre : '<li><a href="#" aria-label="previous"><span aria-hidden="true">&laquo;</span></a></li>',
            next : '<li><a href="#" aria-label="next"><span aria-hidden="true">&raquo;</span></a></li>',
            item : '<li><a href="#" aria-label="pager"></a></li>'
        },
        // 入口方法
        init : function (options) {
            // 获取分页参数
            $.extend(this.settings, options);
            // 检查参数完整性
            if (!this.validateParam()) {
                this.exitError();
                return false;
            }
            // 检查dom元素是否存在
            if(!this.validateDOMExists()){
                this.exitError();
                return false;
            }
            this.paging();
        },
        // 渲染分页按钮
        paging : function(){
            var current = this.settings.page;
            var limit = this.settings.limit;
            var total = Math.ceil(this.settings.total/limit);
            var pageItems = $(this.pageItems.wrap);
            // prev
            if(current > 1){
                pageItems.append($(this.pageItems.pre));
            }
            // items
            for(var i=1;i<=total;i++){
                var item = $(this.pageItems.item);
                item.find("a").first().text(i);
                if(i == current){
                    item.addClass("active");
                }
                
                pageItems.append(item);
            }
            // next 
            if(current < total){
                pageItems.append($(this.pageItems.next));
            }
            this.getElementById(this.settings.paginationWrap).append(pageItems);
           this.pageEventBinding();
        },
        // 绑定分页按钮事件
        pageEventBinding : function(){
            var _that = this;
            // 分页按钮
            bind_event("body", "click", '#' + this.settings.paginationWrap + " a[aria-label='pager']", function(){
                var _item = $(this);
                // 当前激活的按钮不响应事件
                if(_item.parent().hasClass('active')){
                    return false;
                }
                var pageNumber = _item.text();
                _that.pageEvent(pageNumber);
                return false;
            });
            // 上一页按钮
            bind_event("body", "click", '#' + this.settings.paginationWrap + " a[aria-label='previous']", function(){
                var _item = $(this);
                if(_item.parent().hasClass('disabled')){
                    return false;
                }
                var currentPage = _that.getElementById(_that.settings.paginationWrap).find(".active").text();
                _that.pageEvent(currentPage - 1);
                return false;
            });
            // 下一页按钮
            bind_event("body", "click", '#' + this.settings.paginationWrap + " a[aria-label='next']", function(){
                var _item = $(this);
                if(_item.parent().hasClass('disabled')){
                    return false;
                }
                var currentPage = _that.getElementById(_that.settings.paginationWrap).find(".active").text();
                _that.pageEvent(parseInt(currentPage) + 1);
                return false;
            });
        },
        // 激活按钮
        activeBtn : function(page){
            var wrap = this.getElementById(this.settings.paginationWrap);
            wrap.find("li").each(function(index, item){
                $(item).removeClass("active");
                if($(item).find("a[aria-label='pager']").text() == page){
                    $(item).addClass("active");
                }
            });
            
            wrap.find("a[aria-label='previous']").parent().removeClass("disabled");
            wrap.find("a[aria-label='next']").parent().removeClass("disabled");
            if(page == 1){
                // 上一页按钮不可用
                wrap.find("a[aria-label='previous']").parent().addClass("disabled");
            }else if(page == Math.ceil(this.settings.total/this.settings.limit)){
                // 下一页按钮不可用
                wrap.find("a[aria-label='next']").parent().addClass("disabled");
            }
        },
        // 分页按钮点击事件
        pageEvent : function(pageNumber){
            var _that = this;
            //todo 补充额外的请求参数
            post_data = {};
            post_data.page = pageNumber;
            post_data.limit = _that.settings.limit;
            ajax_post(this.settings.requestUrl, 'pagination', post_data, function(data){
                // 渲染返回数据
                var template_str = _that.getElementById(_that.settings.template).text();
                var template_obj = $(template_str);
                var info = data[template_obj.attr('key')];
                // 清空旧数据，使用新页面数据替换模板
                var dataWrap = _that.getElementById(_that.settings.dataWrap);
                dataWrap.children().remove();
                
                for(var i in info){
                    // 用返回数据替换模板变量
                    var realValue = template_str.replace(/{{([0-9a-z_]+)}}/gi, function(match, p1){
                        // todo Debugging
                        return info[i][p1] + '--' + post_data.page;
                    });
                    dataWrap.append($(realValue)); 
                }
            });
            // 设置当前按钮激活
            _that.activeBtn(pageNumber);
        },
        // 根据id得到DOM元素
        getElementById : function(id){
            return $('#' + id);
        },
        /**
         * 出错返回
         */
        exitError : function () {
            console.error(this.error);
        },
        /**
         * 检查参数完整性
         * @returns boolean
         */
        validateParam : function () {
            for (var e in this.requiredParams) {
                var current = this.settings[this.requiredParams[e]];
                if (current == undefined) {
                    this.error.code = e;
                    this.error.msg = 'Parameter : [' + this.requiredParams[e] + '] is not defined';
                    return false;
                }
            }
            
            return true;
        },
        /**
         * 检查dom元素是否存在
         * @returns boolean
         */
        validateDOMExists : function(){
            for(var e in this.requiredElement){
                var current = this.settings[this.requiredElement[e]];
                var element = document.querySelector('#'+current);

                if(!(element instanceof Object)){
                    this.error.code = e;
                    this.error.msg = 'DOM element [' + this.settings[this.requiredElement[e]] + '] must be exists';
                    return false;
                }
            }
            return true;
        }
    };
    
    Pagination.init(options);

    /**
     * 绑定事件
     * @param wrap
     * @param trigger
     * @param event
     * @param call_back
     */
    function bind_event(wrap, event, trigger, call_back){
        $(wrap).on(event, trigger, call_back);
    }
    /**
     * ajax post 请求方法
     * @param url
     * @param action
     * @param post_data
     * @param call_back
     */
    function ajax_post(url, action, post_data, call_back){
        // 合并action参数和请求参数
        var requests = $.extend(post_data, {'action': action});
        var settings = {
            'url' : url,
            'data' : requests,
            'type' : 'POST',
            'dataType' : 'json',
            'success' : call_back
        };
        $.ajax(settings);
    }
};
