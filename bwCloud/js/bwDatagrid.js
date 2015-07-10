/**
 * Created by bill on 15/6/29.
 */
/**
 * Created by bill on 15/6/29.
 */

bwConfig.bwDatagrid=(function(){

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

    var initMenu=function(cb){




        var h1='<div style="border:1px #008000 solid;" class="col-md-6">user</div><div style="border:1px #008000 solid;" class="col-md-6">9</div>';
        $("#classMenu").html(h1);
        initHandle();
    };
    return {initMenu:initMenu};
})();

