import React, { Component } from "react";
import "./App.css";
import Image from "./components/Image";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://api.unsplash.com/photos/?client_id=LqP1bNdvX8VncEmSaVp23fXv_ZzZf-drxT4V0cS1eGM&page=1&per_page=30&order_by=latest"
    )
      .then((res) => res.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            images: json,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, images } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App-header">
          {images.map((image) => (
            <Image image={image} key={image.id} />
          ))}
        </div>
      );
    }
  }
}

export default App;
