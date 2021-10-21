/*   
    
    File Name: app.js
    Studnet Name: Jigneshbhai Patel
    Studnet ID: 301109873
    Date: 2021/10/21
    

*/

(function(){

    function Start()
    {
        console.log("App Started...");
        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) =>{
                if(!confirm("Are you confirm?"))
                {
                    event.preventDefault();
                    window.location.assign('/list-view');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();

