import { LightningElement, wire } from 'lwc';
import getMovie from '@salesforce/apex/ExternalAPIIntegration.callExternalAPI'

export default class IMDb_Integration extends LightningElement {
    userInput='';
    parameter = '';
    movies=[];
    showText = 'Please Enter Valid Movie Name';  

    //Handle change in the input field
    handleChange(event)
    {
        this.userInput = event.target.value;        
    }

    // Handle click on the button
    handleClick(event)
    {
        this.parameter = this.userInput;
    }

   // Get list of movies based on user input
    @wire(getMovie, {searchKey:'$parameter'})
    getMovies(result){   
        
        if(result.data)
        {
            
                let data = JSON.parse(result.data);            
                if (data.success) {
                    this.movies = data.result;
                    this.showText='';
                    data.result.forEach(movie => {
                        console.log('Title:', movie.Title);
                        console.log('Year:', movie.Year);
                        console.log('IMDB ID:', movie.imdbID);
                        console.log('Type:', movie.Type);
                        console.log('Poster:', movie.Poster);
                        console.log('-------------------');                        
                    });                    
                }
                else{
                    {
                        this.movies =[];
                        this.showText='Please Enter Valid Movie Name';
                    }
                }            
          
        }
        else if (result.error) {
            console.log('Error occured while searching movies: '+result.error);
            this.showText='Error occured while searching movies: '+result.error;
        }                      
            
}    

}