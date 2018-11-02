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
    return "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  }
  
  componentDidMount() {
    this.setState({ state: this.state });
    fetch(this.antiCorsFunction())
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          }); 
        }
      )
      
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
