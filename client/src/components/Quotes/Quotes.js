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

  componentDidMount() {
    this.setState({ state: this.state });
    fetch("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
          //regex = str.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
              <p dangerouslySetInnerHTML={{__html:item.content}} style={{backgroundColor: '#fdd835', maxWidth: 800,}}/>
              <p>
              {item.title}
              </p> 
            </div>
          ))}
        </div>
      );
    }
  }
}



export default (Quotes);
