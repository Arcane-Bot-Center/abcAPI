module.exports.error = (abc, err)=>{
    if(err.response){
        if(err.response.status === 429){
            err.data = {
                message:'You have been ratelimited please contact the support',
                errCode: 429
            };
            abc.emit('rateLimited',err.data)
        }else{
            if(err.response.status === 502){
                err.data ={
                    message: 'Bad gateway',
                    errCode: 502
                };
                abc.emit('error',err)
            }else if(err.response.status === 500){
                err.data={
                    message:'Internal Server Error',
                    errCode:500
                }
                abc.emit('error',err)
            }

        }
    }else{
        abc.logger.CriticalError(`A critical error has occurred`,'0x0000503',err)
    }

}