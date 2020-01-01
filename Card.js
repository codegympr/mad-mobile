import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import styled from "@emotion/styled";

const Container = styled.div`
  margin: 0 auto;
  -moz-box-shadow: 0 0 6px #ccc;
  -webkit-box-shadow: 0 0 6px #ccc;
  box-shadow: 0 0 6px #ccc;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  line-height: 1.5;
  max-height: 500px;
  margin-bottom: 20px;
  box-shadow: 0;
  transition: all 200ms ease-in-out;
  background-color: #fff;
  &:hover {
    box-shadow: 0 20px 20px #ccc;
  }
  h1 {
    text-align: center;
  }
  .description {
    padding: 20px;
    text-align: center;
    font-family: arial;
    color: #979797;
    font-size: 3vmin;
  }
  .header {
    display: flex;
    height: 100px;
    justify-content: space-between;
    color: #fff;
    padding: 10px;
    background-color: #416dff;
    border-radius: 5px 5px 0 0;
    text-align: center;
    .fullName {
      line-height: 60pt;
      text-align: center;
      flex: 1;
    }
    .icon {
      display: inline-block;
      font-size: 6vmin;
    }
    span {
      font-size: 4vmin;
      font-family: Arial;
      font-weight: bold;
      text-align: center;
    }
  }
  .avatar {
    -moz-box-shadow: 2px 4px 12px #000;
    -webkit-box-shadow: 2px 4px 12px #000;
    box-shadow: 2px 4px 12px #000;
    background-color: #fff;
    height: 120px;
    max-height: 120px;
    width: 120px;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    top: -46px;
    margin-bottom: -60px;
    img {
      border-radius: 50%;
      border: 4px solid #fff;
      height: 120px;
      max-height: 120px;
      width: 120px;
    }
  }
`;

const NameContainer = styled.div`
  display: flex;
  input[type="text"] {
    position: relative;
    top: 20px;
    color: #fff;
    width: 100%;
    padding: 10px;
    margin: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: 5px;
  }
`;
const ContactContainer = styled.div`
  padding: 20px;
  input[type="text"] {
    color: #fff;
    width: 100%;
    padding: 10px;
    margin: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: 5px;
  }
`;

const Card = props => {
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [city, setCity] = useState(props.city);
  const [state, setState] = useState(props.state);
  useEffect(() => {
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setEmail(props.email);
    setPhone(props.phone);
    setCity(props.city);
    setState(props.state);
  }, [
    props.firstName,
    props.lastName,
    props.email,
    props.phone,
    props.city,
    props.state
  ]);

  return (
    <Container>
      <div className="header">
        <div className="icon" onClick={() => setEdit(!edit)}>
          <FaUserEdit
            style={
              edit ? { color: "rgba(20, 255, 50, 0.6)" } : { color: "white" }
            }
          />
        </div>
        <div className="fullName">
          {edit ? (
            <NameContainer>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </NameContainer>
          ) : (
            <span>
              {firstName} {lastName}
            </span>
          )}
        </div>
        <div>{""}</div>
      </div>
      <div className="avatar">
        <img alt="" src={props.avatar} />
      </div>
      <div className="description">
        {edit ? (
          <ContactContainer>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>
          </ContactContainer>
        ) : (
          <ContactContainer>
            <p> {email} </p>
            <p> {phone} </p>
            <p>
              {city} {state}
            </p>
          </ContactContainer>
        )}
      </div>
    </Container>
  );
};
export default Card;
