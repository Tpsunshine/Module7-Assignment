$(document).ready(function(){
    


        $("#addtolist").click(()=>{
            var data = $("#myform").serialize();
            console.log("The data from the form Add Data is ");
            //undefined
            console.log(data);
            $.ajax({
                url:"/user/adduser",
                type:"PUT",
                data: data,
                success: function(details){
                    if(details=="Please enter all the details"){
                        alert(details);
                    }
                    else if(details=="Email ID already exists"){
                        alert(details);
                    }
                    else{
                        console.log("entered else loop ");
                        window.location.reload();
                    }
                console.log(details)
                }     
            });


        });
});
