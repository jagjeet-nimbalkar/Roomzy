class expressError extends Error{
    constructor(status,messaage){
        super();
        this.status=status;
        this.message=messaage;
    }
}
module.exports=expressError;