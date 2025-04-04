import DisplayErrorPop from '../classes/errorDisplay';

const planErrors = (values, message)=>{
    const errorDisplay = new DisplayErrorPop(); 
        if(values===''){
            errorDisplay.message = {
                title : message.title,
                des : message.des
            }
            errorDisplay.display();
            return 0;
        }else{
            return 1;
        }

}

export default planErrors