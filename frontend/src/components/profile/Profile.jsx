import { faCheck, faCopy, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { DEFAULT_PROFILE } from "../../utils/constants";

function UserInfoCard({ userInfo, publicAddress, accountBalance, getBalance }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the icon after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <Card style={{ width: "20rem" }} className="mb-3">
      <Card.Img
        variant="top"
        src={userInfo?.profileImage ?? DEFAULT_PROFILE}
        alt={`${userInfo?.name}'s profile`}
      />
      <Card.Body>
        <Card.Title>{userInfo.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {userInfo?.email}
        </Card.Subtitle>
        {userInfo?.typeOfLogin && (
          <Card.Text>
            <strong>Type of Login:</strong> {userInfo?.typeOfLogin}
          </Card.Text>
        )}
        {userInfo?.verifierId && (
          <Card.Text>
            <strong>ID:</strong> {userInfo?.verifierId}
          </Card.Text>
        )}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <strong>Public Address:</strong>
          <span className="ms-2">{publicAddress}</span>
          <Button
            variant="link"
            className="p-0 ms-2 text-secondary"
            onClick={() => copyToClipboard(publicAddress)}
            title={copied ? "Copied!" : "Copy to Clipboard"}
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          </Button>
        </ListGroupItem>
        <ListGroupItem>
          <strong>Account Balance:</strong> {accountBalance}
          <Button
            variant="link"
            className="p-0 ms-2 text-secondary"
            onClick={() => getBalance()}
            title={"refresh"}
          >
            <FontAwesomeIcon icon={faRefresh} />
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

function Profile() {
  const {
    login,
    loggedIn,
    logout,
    userInfo,
    accountBalance,
    publicAddress,
    getUserInfo,
    getAccounts,
    getBalance,
  } = useAuth();
  const loggedInView = (
    <>
      <UserInfoCard
        userInfo={userInfo}
        accountBalance={accountBalance}
        publicAddress={publicAddress}
        getBalance={getBalance}
      />
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default Profile;
