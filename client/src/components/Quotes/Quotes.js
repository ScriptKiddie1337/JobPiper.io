import React from 'react';

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  antiCorsFunction() {
    this.setState({ state: this.state });
    fetch("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
          console.log(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          }); 
        }
      )
  }

  
  componentDidMount() {
    return this.antiCorsFunction()
      
  }

  refreshQuoteList = res => this.setState({ quotes: res.data.quotes })

  refreshQuoteList = () => 
  this.setState({refreshQuoteList: !this.state.refreshQuoteList})
  

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
           {items.map(item => (
            <div key={item.ID}>
              <h4 dangerouslySetInnerHTML={{__html:item.content}} />
              <h3  dangerouslySetInnerHTML={{__html:item.title}}/>
      
            </div>
			
          ))}
        </div>
      );
    }
  }
}



export default (Quotes);
