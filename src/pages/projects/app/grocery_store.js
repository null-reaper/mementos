import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images
import example from '../../../images/app/grocery_store/example.png';
import er_model from '../../../images/app/grocery_store/er_model.png';

const GroceryStorePage = () => {
  return (
    <ProjectPage image={ example } title="Grocery Store App" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>The goal was to build a US grocery store application using a database backend to store information about products, availability of products in the stock, and customers of the store. Java was used to create the Desktop Application while PostgreSQL was the primary database language. Code for this project can be found <a href="https://github.com/null-reaper/grocery-store-app">here</a>.</p>
      </article>
      <article className="project-article">
        <h1>Overview</h1>
        <p>The designed application is meant to support two types of users: customers and staff. Customers of the store can search for products and look up information about products, setup an account and change their preferences and account details, order products, and make payments. Staff of the store can modify and create products, update the availability of products in the stock, query customer information, and process orders.</p>
        <p>To achieve this functionality, information about users, products and the like were stored in a database. The ER Model below summarizes the relevant data and their relationships.</p>
        <figure id="er_model">
          <img src={er_model} alt="ER Model"/>
          <figcaption>Figure 1: Entity-Relationship (ER) Model of the Grocery Store Database</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Login Area</h1>
        <p>In order to use the app, users must first login in (or sign up) using a valid username and password. Additionally, the user must select the zipcode of the store locations they want to shop at (different stores may have different products). Depending on the type of user (customer vs staff), the user will see a slightly different home page after a successful login attempt.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/QyIWD59Q2GI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Search Feature</h1>
        <p>A typical search bar can be found on the home page. Customers can enter keywords to look up relevant products. The implemented search function tokenizes the search string and returns all products containing those keywords in their name. Products are displayed in database order (with newest products added to the end of the list) by default; they can further be filtered by department and sorted by relavance or price. Customers can select a quantity and click on the buy button next to the products to add it to their cart. Additionally, customers can view the calorie content of a product by clicking on the "More Info." button.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/IqCeYFSacQg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Editing the Cart</h1>
        <p>If customers are not happy with their selection, they can change the quantity of remove products directly from the cart menu. Clicking the "Update Cart" button consolidates the changes made.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/-kKvUqbb_Pw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Adding Credit Cards &amp; Addresses</h1>
        <p>Before placing their order, customers need to supply their credit card information and delivery address. To accomodate regular customers, the app allows customers to store their credit card information (with an associated address) and reuse it for future purchases.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/RYCix7iuEHA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Placing an Order</h1>
        <p>Once customers have placed their items in the cart and have selected a valid credit card and delivery address, they can simply hit the "Place Order" button to complete the transaction. Customers can also view their ongoing on past orders from the home page (under "Your Orders").</p>
        <iframe class="vid" src="https://www.youtube.com/embed/-DD-Eid6Av8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Receiving an Order</h1>
        <p>Once the customer has received their order, they must select the "Acknowledge" option for that order to notify the seller of a successful delivery. The status of he order is changed to "received".</p>
        <iframe class="vid" src="https://www.youtube.com/embed/igxmzmHWq14" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Saving the Cart</h1>
        <p>If customers decide to postpone their shopping plans halfway through, they have the option to save their cart so that they can continue shopping the next time they login.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/ZA0UVnwTUQ0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Editing Customer Information</h1>
        <p>At any given time, customers are free to modify their information stored in the app's database. For this project, this is limited to changing their first name, last name and password (username cannot be changed).</p>
        <iframe class="vid" src="https://www.youtube.com/embed/Hwsh2Nie1qk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Editing Staff Information</h1>
        <p>Just like with customers, staff members can also change first name, last name and password. Additionally, they can also change their street address and city (since this information is collected as well).</p>
        <iframe class="vid" src="https://www.youtube.com/embed/dpiwG6eH3eo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Modifying Products</h1>
        <p>Unlike customers, staff members can directly modify product details from the search interface. This includes changing the product name, size, price, nutrition content and quantity.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/lOwTxCaB_Q4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Adding/Deleting Products</h1>
        <p>Staff members also have the means to add new products by selecting an appropriate name, size, category, nutrition content (optional), price and location. Alternatively, staff members can delete existing products if needed.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/HMLMarixpKA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Checking &amp; Updating Warehouses</h1>
        <p>Products are stored in specific warehouses. These can be viewed by clicking on the "Check Availability" button. Staff members can look at all warehouses housing the selected product and view/modify its stock appropriately.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/02oxiF6lFqU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Sending Out Orders</h1>
        <p>When customers place an order, a staff member needs to complete their side of the transaction by selecting the appropriate warehouse (containing enough stock) from which to ship each product.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/_FuSenjVhXc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
      <article className="project-article">
        <h1>Checking Suppliers</h1>
        <p>Finally, staff members can also view a list of suppliers from which they can purchase items and look into exactly which products are sold by each of them.</p>
        <iframe class="vid" src="https://www.youtube.com/embed/gn9z5NXIyhs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </article>
    </ProjectPage>
  )
}

export default GroceryStorePage
