/**
 * Created by bill on 15/6/29.
 */

bwConfig.bwClazzMenu=(function(){



    function filterClazzMenu()
    {
        var val=$("#searchText").val();
        $("#classMenu .clazzMenuItem").each(function(){
           // var val="sound";
            var self=this;
          //  $(this).find('a').not(":contains(" + val + ")").css("display", "none");
            if($(this).find('a').not(":contains(" + val + ")").length>0)
            {
                $(self).css("display", "none");
            }
            else
            {
                $(self).show();
            }
        });
    }


                var test=function(){
                    alert("suc");
                };
                function addMenu(item){


                    var h1='<div class="'+bwConfig.BWCLAZZMENU.ITEMNAME+item.name+' clazzMenuItem"><div style="border:1px #008000 solid;" class="col-md-6"><a href="#/data/'+item.name+'">'+item.name+'</a></div><div style="border:1px #008000 solid;" class="col-md-6">0</div></div>';
                   var h2='<a href="#/data/:111">#/a1/a2/a3:id</a>';
                   
                    $("#classMenu").append(h1);

                }
                function addClazz(){
                   //alert($.trim($("#inputClazzName").val()));
                   // return;

                    var params={
                        name: $.trim($("#inputClazzName").val())
                    };
                    jQuery.ajax({
                        url: bwConfig.SERVERPATH+'admin/clazz/',
                        //   url: 'http://127.0.0.1:3010/users/testHead',
                        type: "post",
                        data:JSON.stringify(params),
                        headers: {
                            "Content-Type":"application/json;charset=UTF-8"
                        },
                        success:function(data){
                            if(data.code==0)
                            {
                                addMenu(params);
                            }
                           alert(data.message)
                        },
                        error:function(data,error)
                        {



                        }
                    });

                }
                function initCreateClazzHandle(){
                    $('#createClazzModal .btn-primary').on('click', function () {
                       addClazz();

                    })
                }
                function initHandle(){
                    initCreateClazzHandle();
                };

                var initMenu=function(cb){



                    $.ajax({
                        type:"get",
                        url:bwConfig.SERVERPATH+"admin/clazz/",
                        // data:,
                        dataType:"json",
                        success:function(result)
                        {
                            var h1='';

                            for(var i in result)
                            {
                                var name=result[i].name;
                                var id=result[i].id;

                                addMenu(result[i]);


                              //  h1+='<div style="border:1px #008000 solid;" class="col-md-6">'+name+'</div><div style="border:1px #008000 solid;" class="col-md-6">'+id+'</div>';
                            }
                          //  $("#classMenu").html(h1);
                            initHandle();
                          //  filterClazzMenu();
                        },
                        error:function(data)
                        {


                        }
                    });








                };
                return {test:test,initMenu:initMenu,filterClazzMenu:filterClazzMenu};
})();


bwConfig.bwMenuBtn=(function(){








    var deleteRow={};
    deleteRow=function(){
        jQuery.ajax({
            url: bwConfig.SERVERPATH+'object/'+bwConfig.bwRouterVal.clazzName,
            //   url: 'http://127.0.0.1:3010/users/testHead/123',
            type: "delete",
//            data:JSON.stringify(params),
////            data:params,
//            headers: {
//                "Content-Type":"application/json;charset=UTF-8"
//            },
            success:function(data){
                $("."+bwConfig.BWCLAZZMENU.ITEMNAME+bwConfig.bwRouterVal.clazzName).remove();
                alert("dropClassSuc");
//                if(data.code==0)
//                {
//                    addMenu(params);
//                }
//                alert(data.message)
            },
            error:function(data,error)
            {
                alert("dropClassError");
            }
        });

    };

    function addMenu(item){
        var h1='<div style="border:1px #008000 solid;" class="col-md-6 cla-item">'+item.name+'</div><div style="border:1px #008000 solid;" class="col-md-6">0</div>';
        var h2='<a href="#/data/:111">#/a1/a2/a3:id</a>';

        $("#classMenu").append(h1);
    }
    function addClazz(){
        //alert($.trim($("#inputClazzName").val()));
        // return;

        var params={
            name: $.trim($("#inputClazzName").val())
        };
        jQuery.ajax({
            url: bwConfig.SERVERPATH+'admin/clazz/',
            //   url: 'http://127.0.0.1:3010/users/testHead',
            type: "post",
            data:JSON.stringify(params),
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            },
            success:function(data){
                if(data.code==0)
                {
                    addMenu(params);
                }
                alert(data.message)
            },
            error:function(data,error)
            {



            }
        });

    }

    function addColumn(){
        var params={
            name:$.trim($("#form-data-col-add-name").val()),
            type:parseInt($("#form-data-col-add-type").val())
        };
        jQuery.ajax({
            url: bwConfig.SERVERPATH+'admin/clazz/'+bwConfig.bwRouterVal.clazzName+'/field/',
            //   url: 'http://127.0.0.1:3010/users/testHead',
            type: "post",
            data:JSON.stringify(params),
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            },
            success:function(data){

                bwConfig.bwDatagrid.initDataGrid();


//                if(data.code==0)
//                {
//                    addMenu(params);
//                }
                alert(data.message)
            },
            error:function(data,error)
            {

            }
        });

    }
    function deleteColumn()
    {

       var tempField=$("#deleteColumn select").find("option:selected").text();


        jQuery.ajax({
            url: bwConfig.SERVERPATH+'admin/clazz/'+bwConfig.bwRouterVal.clazzName+'/field/'+tempField,
            //   url: 'http://127.0.0.1:3010/users/testHead/123',
            type: "delete",
//            data:JSON.stringify(params),
////            data:params,
//            headers: {
//                "Content-Type":"application/json;charset=UTF-8"
//            },
            success:function(data){

                alert("dropClassSuc");
                bwConfig.bwDatagrid.initDataGrid();
            },
            error:function(data,error)
            {
                alert("dropClassError");
            }
        });

    }

    function dropClazz(){
        if(bwConfig.bwRouterVal.clazzName)
        {
            jQuery.ajax({
                url: bwConfig.SERVERPATH+'admin/clazz/'+bwConfig.bwRouterVal.clazzName,
                //   url: 'http://127.0.0.1:3010/users/testHead/123',
                type: "delete",
//            data:JSON.stringify(params),
////            data:params,
//            headers: {
//                "Content-Type":"application/json;charset=UTF-8"
//            },
                success:function(data){
                    $("."+bwConfig.BWCLAZZMENU.ITEMNAME+bwConfig.bwRouterVal.clazzName).remove();
                    alert("dropClassSuc");
//                if(data.code==0)
//                {
//                    addMenu(params);
//                }
//                alert(data.message)
                },
                error:function(data,error)
                {
                    alert("dropClassError");
                }
            });

        }
        else
        {
            alert("请选择一个class");
        }




    }
    function initCreateClazzHandle(){
        $('#createClazzModal .btn-primary').on('click', function () {
            addClazz();

        })
    }
//    function initCreateColumnHandle(){
//        $('#testCC').on('click', function () {

//        //    addClazz();
//            addColumn();
//
//        })
//    }

    function initHandle(){
    //    initCreateColumnHandle();
        initCreateClazzHandle();

    };

    var initMenu=function(cb){



        $.ajax({
            type:"get",
            url:bwConfig.SERVERPATH+"admin/clazz/",
            // data:,
            dataType:"json",
            success:function(result)
            {
                var h1='';

                for(var i in result)
                {
                    var name=result[i].name;
                    var id=result[i].id;

                    addMenu(result[i]);


                    //  h1+='<div style="border:1px #008000 solid;" class="col-md-6">'+name+'</div><div style="border:1px #008000 solid;" class="col-md-6">'+id+'</div>';
                }
                //  $("#classMenu").html(h1);
                initHandle();
            },
            error:function(data)
            {


            }
        });

    };
    return {dropClazz:dropClazz,addColumn:addColumn,deleteRow:deleteRow,deleteColumn:deleteColumn};
})();



bwConfig.bwDatagrid=(function(){
    var dataGridFun={
        formatter: function(value,row,index){
            return bwConfig.tool.dateFormat(new Date(value));
        }
    };
    var totalItems=0;

    var optionState="update";

    var updateRowAjax=function(params,id){
        var params=params||{
            s1:"s5"
        };
        jQuery.ajax({
            url: bwConfig.SERVERPATH+'object/'+bwConfig.bwRouterVal.clazzName+"/"+id,

          //  url: bwConfig.SERVERPATH+'object/'+"sound1"+"/5599f8d20cf203e6d07a97ad",
            //   url: 'http://127.0.0.1:3010/users/testHead',
            type: "put",
            data:JSON.stringify(params),
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            },
            success:function(data){
                $.messager.show({
                    title:"信息提示",
                    msg:data.message,
                    timeout:1000,
                    showType:"show",
                    style:{
                        right:'',
                        bottom:''
                    }
                });


            },
            error:function(data,error)
            {

            }
        });

    }
  //  updateRowAjax();


    var addRowAjax=function(params){
        var params=params||{
            s1:"s5"
        };
        jQuery.ajax({
            url: bwConfig.SERVERPATH+'object/'+bwConfig.bwRouterVal.clazzName,
            //   url: 'http://127.0.0.1:3010/users/testHead',
            type: "post",
            data:JSON.stringify(params),
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            },
            success:function(data){

                getCount(function(count){
                    //debugger;
                    totalItems=count.data.count;
                    optionState="update";
//                if(data.code==0)
//                {
//                    addMenu(params);
//                }


                    var p=$("#bwGrid").datagrid("getPager");
                    $(p).pagination("refresh");

                    $.messager.show({
                        title:"信息提示",
                        msg:data.message,
                        timeout:1000,
                        showType:"show",
                        style:{
                            right:'',
                            bottom:''
                        }
                    });



                });



            },
            error:function(data,error)
            {

            }
        });

    };


    function itemMenuRemove(){
        jQuery.ajax({
            url: bwConfig.SERVERPATH+'admin/clazz/'+bwConfig.bwRouterVal.clazzName+'/field/',
            //   url: 'http://127.0.0.1:3010/users/testHead/123',
            type: "delete",
//            data:JSON.stringify(params),
////            data:params,
//            headers: {
//                "Content-Type":"application/json;charset=UTF-8"
//            },
            success:function(data){
                $("."+bwConfig.BWCLAZZMENU.ITEMNAME+bwConfig.bwRouterVal.clazzName).remove();

                $.messager.show({
                    title:"信息提示",
                    msg:data.message,
                    timeout:1000,
                    showType:"show",
                    style:{
                        right:'',
                        bottom:''
                    }
                });
//                if(data.code==0)
//                {
//                    addMenu(params);
//                }
//                alert(data.message)
            },
            error:function(data,error)
            {
                $.messager.show({
                    title:"信息提示",
                    msg:"失败",
                    timeout:1000,
                    showType:"show",
                    style:{
                        right:'',
                        bottom:''
                    }
                });
            }
        });

    }



    function addMenu(item){
        var h1='<div style="border:1px #008000 solid;" class="col-md-6">user1</div><div style="border:1px #008000 solid;" class="col-md-6">9</div>';
        var h2='<a href="#/data/:111">#/a1/a2/a3:id</a>';

        $("#classMenu").append(h2);
    }
    function initCreateClazzHandle(){
        $('#createClazzModal .btn-primary').on('click', function () {
            addMenu({name:""});
        })
    }
    function initHandle(){
        initCreateClazzHandle();
    };


    function getColumns(cb)
    {
        $.ajax({
            type:"get",
            url:bwConfig.SERVERPATH+"admin/clazz/"+bwConfig.bwRouterVal.clazzName+"/field/",
            // data:,
            dataType:"json",
            success:function(result)
            {
                var columns=[];
                columns.push({field:'ck',checkbox:true});
                columns.push({id:"id",title:"id",field:"id"});
                for(var j in result)
                {
                    for(var i in bwConfig.BWCLAZZTYPE)
                    {
                        if(result[j].type==bwConfig.BWCLAZZTYPE[i].value)
                        {
                            columns.push({id:result[j].id,title:result[j].name,field:result[j].name,editor:bwConfig.BWCLAZZTYPE[i].editor});
                        }
                    }
                }
                columns.push({id:"createdAt",title:"createdAt",field:"createdAt",formatter:dataGridFun.formatter});
                columns.push({id:"updatedAt",title:"updatedAt",field:"updatedAt",formatter:dataGridFun.formatter});
                //createdAt
                cb(columns)
            },
            error:function(data)
            {


            }
        });
    }

    function getData(columns,cb,paging,total)
    {
        paging=paging||"";
        $.ajax({
            type:"get",
            url:bwConfig.SERVERPATH+"object/"+bwConfig.bwRouterVal.clazzName,
             data:paging,
            dataType:"json",
            success:function(result)
            {
                var obj={
                    total:total,
                    rows:result
                };
                cb(obj);
            },
            error:function(data)
            {


            }
        });
    }
    function getCount(cb)
    {
        $.ajax({
            type:"get",
            url:bwConfig.SERVERPATH+"object/"+bwConfig.bwRouterVal.clazzName+"/count",
            dataType:"json",
            success:function(result)
            {
                cb(result);
            },
            error:function(data)
            {


            }
        });
    }
    var editIndex = undefined;
    var editRow=undefined;

    function dateChange(eds)
    {

        for(var i in eds)
        {
            var tempOldHtml=eds[i].oldHtml;
            var tempValue=eds[i].target.val();
            if(tempValue!=tempOldHtml)
            {
                return true;
            }
        }
        return false;
    }

    var storageEditRow=function(eds){
        var storage={};
        for(var i in eds)
        {

            var tempField=eds[i].field;
            var tempValue=eds[i].target.val();

            storage[tempField]=tempValue
        }
        return storage;
    }
    function endEditing(){

        if (editIndex == undefined){return true}
        if ($('#bwGrid').datagrid('validateRow', editIndex)){
             var eds = $('#bwGrid').datagrid('getEditors',editIndex);
            if(dateChange(eds))
            {
                eds=storageEditRow(eds);
                if(optionState=="add")
                {

                    addRowAjax(eds);
                }
                if(optionState=="update")
                {
                    var tempId=$('#bwGrid').datagrid('getRows')[editIndex].id;

                    updateRowAjax(eds,tempId);
                }
            }



            $('#bwGrid').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
    function onDblClickRow(index,row){
        if (editIndex != index){
            if (endEditing()){
                $('#bwGrid').datagrid('selectRow', index).datagrid('beginEdit', index);//开始编辑
                editIndex = index;
                editRow=row;
            } else {
                $('#bwGrid').datagrid('selectRow', editIndex);
            }
        }
    }
    function onClickRow(index,row){
        if (editIndex != index){
            if (endEditing()){
                $('#bwGrid').datagrid('selectRow', index).datagrid('beginEdit', index);//开始编辑
                editIndex = index;
                editRow=row;
            } else {
                $('#bwGrid').datagrid('selectRow', editIndex);
            }
        }
    }

    function append(){

        if (endEditing()){
            optionState="add";
            $('#bwGrid').datagrid('appendRow',{createdAt:new Date().getTime(),updatedAt:new Date().getTime()});
            editIndex = $('#bwGrid').datagrid('getRows').length-1;
            $('#bwGrid').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);
        }
    }
    function removeit(){
        if (editIndex == undefined){return}
        $('#bwGrid').datagrid('cancelEdit', editIndex)
            .datagrid('deleteRow', editIndex);
        editIndex = undefined;
    }
    function accept(){
        if (endEditing()){
            $('#bwGrid').datagrid('acceptChanges');
        }
    }
    function reject(){
        $('#bwGrid').datagrid('rejectChanges');
        editIndex = undefined;
    }
    function getChanges(){
        var rows = $('#bwGrid').datagrid('getChanges');
        alert(rows.length+' rows are changed!');
    }
    var initDataGrid=function(cb){
        var initPageSize=3;
        var intPageNum=0;

        function initForm(column){
            $("#deleteColumn select").empty();
          for(var i in column)
          {
              if(column[i].field!="ck")
              {
                  var option=$('<option>').val(column[i].field).text(column[i].title);
                  $("#deleteColumn select").append(option);
              }
          }

        }
        var column=[];
        var data = [];
        getColumns(function(columns){
            column=columns;
            initForm(columns);

            getCount(function(countObj){

                 totalItems=countObj.data.count;

                getData(columns,function(data){

                    data=data;
                    $("#bwGrid").datagrid({
                        pagination:true,
                        // onClickRow:onClickRow,
                        onDblClickRow:onDblClickRow,
                        onBeforeEdit:function(index,row){


                        },
                        onAfterEdit:function(index,row){


                        },
                        onCancelEdit:function(index,row){


                        },
                        data:data,
                        columns:[column]
                    });

                    var p=$("#bwGrid").datagrid("getPager");
                    $(p).pagination(
                        {
                            onSelectPage:function(pageNumber,pageSize){
                                var paging={
                                    skip:(pageNumber-1)*pageSize,
                                    limit:pageSize
                                };
                                getData(column,function(data){
                                    $("#bwGrid").datagrid("loadData",data);
                                },paging,totalItems);
                            },
                            total:totalItems,
                            pageSize:initPageSize,
                            pageList:[initPageSize,20,30],
                            beforePageText:"第",
                            afterPageText:"页 共{pages}页",
                            displayMsg:"当前显示{from}-{to}条记录 共{total}条记录"
                        }
                    );

                },{skip:intPageNum,limit:initPageSize},totalItems);
            });
        });
    };
    return {initDataGrid:initDataGrid,append:append};
})();



