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
    fetch("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand")
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
              <p dangerouslySetInnerHTML={{__html:item.content}} />
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
