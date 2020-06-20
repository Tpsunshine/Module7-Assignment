$(document).ready(function(){
    


        $("#addtolist").click(()=>{
            var data = $("#myform").serialize();
            console.log("The data from the form Add Data is ");
            //undefined
            console.log(data.productname);
            $.ajax({
                url:"/admin/product/addproduct",
                type:"PUT",
                data: data,
                success: function(details){
                    if(details=="Please enter complete product details"){
                        console.log("entered if block of success");
                        alert(details);
                    }
                    else{
                        console.log("entered else")
                    console.log(details);
                    window.location.reload();
                    }
                },
                error: function(){
                    alert("Please enter product name");
                }
            });


        });
});
