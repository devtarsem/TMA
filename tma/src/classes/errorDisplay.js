import Swal from 'sweetalert2'

class DisplayErrorPop{
    message ;
    display(){
        Swal.fire({
            icon: "error",
            title: `${this.message.title}`,
            text: `${this.message.des}`,
        });
    }
}



export default DisplayErrorPop;