const { search, detail } = require('craigslist-searcher');

//search function will return a promise with a result array
search({
  //city: '', //City's name. Optional. If no city is given, the function will search worldwidely.
  query: 'front', //Keword for the query. Using a white space to separate multiple key words. (e.g. 'computer book')  Optional.
  category: 'sss', //Category's keyword (Please see below). Optional.
  offset: 0 //The number of skipping itmes. Optional.
  }).then(resultArray => {
    console.log(resultArray);
    //resultArray will be an array that contains result data.
    /*It will be like [{
                        datetime: '',
                        url: '',
                        dataId: '',
                        title: '',
                        price: '',
                        region: ''
                      },
                      ...]
    */
  });