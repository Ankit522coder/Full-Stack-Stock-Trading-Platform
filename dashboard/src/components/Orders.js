import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrders(data.orders || []);
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const refreshOrders = () => fetchOrders();
    window.addEventListener("orders-updated", refreshOrders);

    return () => {
      window.removeEventListener("orders-updated", refreshOrders);
    };
  }, []);

  const handleSell = async (orderId) => {
    try {
      const { data } = await axios.delete(`/orders/${orderId}`);
      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      }
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = "http://localhost:3000/login";
      }
    }
  };

  if (loading) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <tr>
            <th>Stock</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.qty}</td>
              <td>{Number(order.price).toFixed(2)}</td>
              <td>{order.mode}</td>
              <td>
                <button
                  type="button"
                  className="sell-order-btn"
                  onClick={() => handleSell(order._id)}
                >
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
