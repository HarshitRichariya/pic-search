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
      searched: false,
      searchParam: "",
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

  onSearchInputChange = (e) => {
    this.setState({
      searchParam: e.target.value,
      searched: true,
      isLoaded: true,
    });
    fetch(
      `https://api.unsplash.com/photos/?client_id=LqP1bNdvX8VncEmSaVp23fXv_ZzZf-drxT4V0cS1eGM&page=1&per_page=30&order_by=latest&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((json) => this.setState({ images: json, isLoaded: false }));
  };

  render() {
    const { error, isLoaded, images, searchParam } = this.state;

    return (
      <div className="App-header">
        <div>
          <input
            value={searchParam}
            onChange={this.onSearchInputChange}
            type="text"
          />
        </div>
        <br />
        {error && <div>Error: {error.message}</div>}
        {!isLoaded && <div>Loading...</div>}
        {
          <div className="img-section">
            {images.map((image) => (
              <Image image={image} key={image.id} />
            ))}
          </div>
        }
      </div>
    );
  }
}

export default App;
