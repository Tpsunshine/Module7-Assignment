$(document).ready(function(){
    $("#productlist").dataTable();

    $(".btn-success").click(function(){
        var id = this.id;
         $("#"+id).html("Added to Cart");
         $('#'+id).css("background-color","orange");
         $('#'+id).css("color","black");
        var numberoforders = $('#'+id+"name td:nth-child(4)").find("select").children("option:selected").val();
       var nameoftheproduct = $('#'+id+"name th:nth-child(1)").text();
       var detailsoftheproduct = $('#'+id+"name td:nth-child(2)").text();
       var priceoftheproduct = $("#"+id+"name td:nth-child(3)").text();
         var details = {
             productname:nameoftheproduct,
             productdetails:detailsoftheproduct,
             productprice:priceoftheproduct,
             productcount:numberoforders
           };
         $.ajax({
             url: "/dashboard/orderproduct",
             type: "PUT",
             data: details,
                success: function(newdata){
                    console.log("The Response from Node js is ");
                    console.log(newdata);
                }
         })


    });

    $(".myorders").click(function(){
        $.ajax({
            url:"/dashboard/myorders",
            type:"GET",
            success:function(response){
                console.log("My Response is ");
                if(response!="noorders"){
                        console.log(response[0].productname);
                        var string ="";
                        for(var i =0;i<response.length;i++){
                            string = string.concat("<tr><td>"+response[i].productname+"</td><td>"+response[i].producrdetails+"</td><td>"+response[i].productprice+"</td><td>"+response[i].productcount+"</td></tr>");
                        }  
                        console.log(string)
                        $("#mytable").html("<h2>My Orders</h2><table class='table table-hover'><thead><tr><th>Productname</th><th>Product details</th><th>Product price</th><th>Quantity</th></tr></thead><tbody>"+string+"</tbody></table>");
                        // $("tbody").html(string);
                    }
                    else{
                        $("#mytable").html("<h2>My Orders</h2><table class='table table-hover'><thead><tr><th>Productname</th><th>Product details</th><th>Product price</th><th>Quantity</th></tr></thead><tbody><tr><td colspan='4' style='text-align:center'>No Data Available</td></tr></tbody></table>");
                                
                    }
            }
        })

    });
})