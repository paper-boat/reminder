var reminder = angular.module('reminder',[]);
     reminder.controller('mainCtrl',['$scope',function($scope){

       $scope.saveData = function(){
           localStorage.list = angular.toJson($scope.todos);
       }
       if( localStorage.list ){
             $scope.todos = angular.fromJson( localStorage.list);
       }else{
         $scope.todos=[
           {
             id:1001,
             title:"新建列表1",
             color:'green',
             item:[
               {id:1001,content:"烦 烦",state:true},
               {id:1002,content:"饿 饿",state:false}
             ]
           },
           {
             id:1002,
             title:"新建列表2",
             color:'purple',
             item:[
               {id:1001,content:"烦 烦",state:true},
               {id:1002,content:"饿 饿",state:false}
             ]
           }
         ];
       }

    //  +
    $scope.addItem=function(){
      var length = $scope.todos.length;
      var colors=['green','purple','red','orange','yellow','blue'];
      var id=Math.max.apply('',$scope.todos.map(function(v,k){
          return v.id;
      }))+1;
      var title="新建列表" + (length+1);
      $scope.currentIndex = 0;
      var qingdan={
        id:id,
        title:title,
        color:colors[length%(colors.length)],
        item:[],
      }

      $scope.cur = qingdan;
      this.todos.push(qingdan);
      $scope.saveData();
    }
    $scope.current = function($index){
         $scope.cur = this.todos[$index];
         $scope.currentIndex =$index;
        //  新建条目
         $scope.add = function(){
            var eventList = $scope.todos[$scope.currentIndex];

         		var data = {content:'新条目',state:false};
         		eventList.item.push(data);
         		$scope.todos[$scope.currentIndex] = eventList;
         		localStorage.list = JSON.stringify($scope.todos);
         }
      //  判断已完成数
      $scope.num =function(){
        		var lis=$scope.todos[$scope.currentIndex].item;
        		var num=0;
        		for(var i=0;i<lis.length;i++){
              if(lis.length === 0){
                return;
              }
        			if(lis[i].state==true){
        				num+=1;
        			}
        		}
        		return num;
        	}
          // 删除条目
    $scope.deleItem = function(index){
         var eventList = $scope.todos[$scope.currentIndex];
         var newlist = [];
         for(var i = 0;i < eventList.item.length;i++){
           if(i != index){
             newlist.push(eventList.item[i]);
           }
         }
         eventList.item = newlist;
         $scope.todos[$scope.currentIndex] = eventList;
         localStorage.list = JSON.stringify($scope.todos);
    }
    //  删除列表
    // $scope.deleteList = function(index){
    //     var ev = $scope.todos[$scope.currentIndex];
    //     $scope.todos = this.todos.filter(function(v,i){
    //         console.log(v,i)
    //     })
        //  this.saveData();

    // }
    $scope.setColor=function(index){
             var colors=['green','purple','red','orange','yellow','blue'];
             $scope.todos[$scope.currentIndex].color=colors[index];
    	}




  }


}])
