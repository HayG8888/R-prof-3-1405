import React from 'react';
import { Link } from 'react-router-dom';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ContentSend from 'material-ui/svg-icons/content/send';

import PropTypes from "prop-types";
import { push } from 'connected-react-router';

import { connect } from 'react-redux';
import { addChat } from '../../store/actions/chats_actions.js';
import { bindActionCreators } from 'redux';

import { TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import './style.css';


class ChatList extends React.Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        addChat: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
    }

    state = {
        input: ''
    }

    handleAdd = () => {
        if (this.state.input) {
            this.props.addChat(this.state.input);
            this.setState({input: ''});
        }
    }

    handleChange = (evt) => {
        if (evt.keyCode !== 13) this.setState({ [evt.target.name]: evt.target.value })
    }

    handleKeyUp = evt => {
        if (evt.keyCode == 13) this.handleAdd();
    }

    handleNavigate = (link) => {
        this.props.push(link);
    }

    render() {
        let { chats } = this.props;

        let chatsArray = Object.keys(chats).map(chatId => (
                // <Link to = { `/chat/${ key }/` } key = { key }>
                    <ListItem 
                        primaryText = { chats[chatId].title } 
                        leftIcon = { <ContentSend /> } 
                        style={{color: '#fff'}}
                        key={chatId}
                        onClick={ () => this.handleNavigate(`/chat/${chatId}`) }
                    />
                // </Link>
        ));
        return (
            <List>
                { chatsArray }

                <ListItem 
                    key = "Add new chat..."
                    leftIcon = { <AddIcon /> }
                    onClick = { this.handleAdd }
                    children = {
                        <TextField 
                            key = "textField"
                            name = "input"
                            hintText = "Add new chat"
                            onChange = { this.handleChange }
                            value = { this.state.input }
                            onKeyUp = { this.handleKeyUp }
                            style={{color: '#fff'}}
                            className="add_chat"
                        />
                    }
                />
            </List>
        )
    }
}

const mapStateToProps = ({ chatsReducer }) => ({ chats: chatsReducer.chats });

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
