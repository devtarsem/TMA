class DateToLabels{
    
    date;

    converstion(){
        if(this.date.split('-')[1] == 1){
            return `${this.date.split('-')[0]} - Jan`;
        }else if(this.date.split('-')[1] == 2){
            return `${this.date.split('-')[0]} - Feb`;
        }else if(this.date.split('-')[1] == 3){
            return `${this.date.split('-')[0]} - Mar`;
        }else if(this.date.split('-')[1] == 4){
            return `${this.date.split('-')[0]} - Apr`;
        }else if(this.date.split('-')[1] == 5){
            return `${this.date.split('-')[0]} - May`;
        }else if(this.date.split('-')[1] == 6){
            return `${this.date.split('-')[0]} - Jun`;
        }else if(this.date.split('-')[1] == 7){
            return `${this.date.split('-')[0]} - Jul`;
        }else if(this.date.split('-')[1] == 8){
            return `${this.date.split('-')[0]} - Aug`;
        }else if(this.date.split('-')[1] == 9){
            return `${this.date.split('-')[0]} - Sep`;
        }else if(this.date.split('-')[1] == 10){
            return `${this.date.split('-')[0]} - Oct`;
        }else if(this.date.split('-')[1] == 11){
            return `${this.date.split('-')[0]} - Nov`;
        }else if(this.date.split('-')[1] == 12){
            return `${this.date.split('-')[0]} - Dec`;
        }
    }

}

export default DateToLabels;