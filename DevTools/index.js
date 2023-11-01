import React, { Component } from 'react';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [], // Store your product data here
      filteredProducts: [], // Store filtered products
      sortKey: 'price', // Initial sort key
      sortOrder: 'asc', // Initial sort order
      currentPage: 1,
      productsPerPage: 10, // Number of products to show per page
    };
  }

  componentDidMount() {
    // Fetch products data from an API or a local data source and set it to the state.
    // For simplicity, we'll just use some example data.
    this.setState({ products: exampleProducts, filteredProducts: exampleProducts });
  }

  handleSort = (key) => {
    const { filteredProducts, sortOrder } = this.state;

    // Toggle the sorting order if the same key is clicked again
    const newOrder = key === this.state.sortKey ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (newOrder === 'asc') {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });

    this.setState({
      filteredProducts: sortedProducts,
      sortKey: key,
      sortOrder: newOrder,
    });
  };

  handleFilter = (category) => {
    const { products } = this.state;

    if (category === 'all') {
      this.setState({ filteredProducts: products });
    } else {
      const filteredProducts = products.filter((product) => product.category === category);
      this.setState({ filteredProducts, currentPage: 1 });
    }
  };

  handlePagination = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { filteredProducts, sortKey, sortOrder, currentPage, productsPerPage } = this.state;

    // Calculate pagination data
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <div>
        <h1>Product List</h1>
        <div>
          <label>Filter by Category: </label>
          <select onChange={(e) => this.handleFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={() => this.handleSort('title')}>Title {sortKey === 'title' && sortOrder}</th>
              <th onClick={() => this.handleSort('price')}>Price {sortKey === 'price' && sortOrder}</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Pagination
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            handlePagination={this.handlePagination}
          />
        </div>
      </div>
    );
  }
}

const Pagination = ({ currentPage, productsPerPage, totalProducts, handlePagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <a onClick={() => handlePagination(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const exampleProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: 10.99,
    category: 'category1',
  },
  // Add more products here
];

export default ProductList;
