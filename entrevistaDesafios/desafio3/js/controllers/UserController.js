class UserController{
    constructor(){
        this.addEventBtns();
        this.users = {}
    }

    addLine(user){
        let tr = document.createElement('tr');
        tr.innerHTML+= `
        <td class='table-name'>${user.getName()}</td>
        <td class='table-email'>${user.getEmail()}</td>
        <td class='table-login'>${user.getLogin()}</td>`;
        tr.innerHTML+=`
        <td class='table-actions'>
            <span class="material-icons-sharp edit-btn">edit</span>
            <span class="material-icons-sharp delete-btn">delete</span>
        </td>`;

        document.querySelector('.users tbody').appendChild(tr);

        document.querySelectorAll('.edit-btn')[document.querySelectorAll('.edit-btn').length-1].addEventListener('click',()=>{
            document.querySelector('.form-edit').style.display = 'flex';

            let userObj = JSON.parse(tr.dataset.user);
            let user = new User(userObj._name, userObj._email, userObj._login, userObj._password);
            let formE1 = document.querySelector('.form.edit');
            let elements = formE1.elements;
            elements.name.value = user.getName();
            elements.email.value = user.getEmail();
            elements.login.value = user.getLogin();
})


        document.querySelectorAll('.delete-btn')[document.querySelectorAll('.delete-btn').length - 1].addEventListener('click',()=>{
            let userObj = JSON.parse(tr.dataset.user);
            let user = new User(userObj._name,userObj._email,userObj._login,userObj._password);
            delete this.users[user.getName()];
            tr.replaceWith('')
        })
    }

    register(){
        let formE1 = document.querySelector('.register'); 
        let elements = formE1.elements;
        let user;
        JSON.stringify(this.users) == JSON.stringify({})
            user = new User(elements.name.value,elements.email.value,elements.login.value,elements.password.value);
       

        //precisa acrescentar mais linhas
        this.addLine(user)
        document.querySelector('.form-add').style.display='none'
        formE1.reset()
        
    }
    
    closeForm(form, formContainer){
        form.reset();
        formContainer.style.display = 'none'
        }

    attRows(tr,user){
        tr.dataset.user = JSON.stringify(user)
        tr.querySelector('.table-name').innerHTML = user.getName()
        tr.querySelector('.table-email').innerHTML = user.getEmail()
        tr.querySelector('.table-login').innerHTML = user.getLogin()

    }

    edit(){
        let formE1 = document.querySelector('.form-edit');
        let elements = formE1.elements;

        let selectedUser = [...document.querySelectorAll('.users tr:not(:first-child)')].filter((v)=>{
            if(JSON.parse(v.dataset.user)._id == elements.id.value){
                return v;
            }
        })

        let userObj = JSON.parse(selectedUser[0].dataset.user);
        userObj._name = elements.name.value
        userObj._email = elements.email.value
        userObj._login = elements.logn.value
        let user = new User(userObj._name,userObj._email,userObj._login,userObj._password);

        if(files.length == 0){
            this.attRows(selectedUser[0],user)
            this.closeForm(document.querySelector('form.edit'),document.querySelector('.form-edit'))
        }else{
            this.readPhoto(files[0]).then((result)=>{
                this.attRows(selectedUser[0],user)
                this.closeForm(document.querySelector('form.edit'),document.querySelector('.form.edit'))
            },(e)=>{
                console.error(e)
            })
        }
    }

    addEventBtns(){
        //abre o form de registro 
        document.querySelector('.add').addEventListener('click',()=>{
            document.querySelector('.form-add').style.display = 'flex'
        })
        //fecha o form de registro
        document.querySelectorAll('.close')[0].addEventListener('click',()=>{
            this.closeForm(document.querySelector('form.register'),document.querySelector('.form-add'))
        })
        //fecha o form de edit
        document.querySelectorAll('.close')[1].addEventListener('click',()=>{
            this.closeForm(document.querySelector('form.edit'),document.querySelector('.form-edit'))
        })
        //pressiona o submit no form de registro
        document.querySelectorAll('.check')[0].addEventListener('click',()=>{
           this.register();
        })
        //pressiona o submit do form de edit
        document.querySelectorAll('.check')[1].addEventListener('click',()=>{
            this.edit();
         })
    } 
}