import React, {Component} from 'react'

import {Container} from "@material-ui/core"

import MessageField from './MessageField/index.jsx'
import SendMessage from './SendMessage/index.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        {
          author: 'bot',
          message: 'Hello!'
        },
        {
          author: 'bot',
          message: 'Send me message)'
        }
      ],
      inputValue: '',
      // state бота
      botMessageState: {
        // очередь бота
        botQueue: false,
        // сообщение в доставке
        inProcess: false,
        // вариативность ответа
        messages: [
          'Hello', 'Im fine, thanks)', 'How do you do?', 'By'
        ]
      }
    }
  }

  onScroll() {
    const mess = document.querySelector('.messages');
    mess.scrollTop = mess.scrollHeight;
  }

  onChange(e) {
    if (e.key !== "Enter") {
      const inputValue = e.target.value
      this.setState((prevState) => ({
        ...prevState,
        inputValue: inputValue
      }))
    } else {
      this.onSend(e)
    }
  }

  onSend(e) {
    if (this.state.inputValue !== '') {
      e.preventDefault()
      this.setState((prevState) => ({
        messages: [...prevState.messages, {
          author: 'user',
          message: prevState.inputValue
        }],
        inputValue: '',
        botMessageState: {
          ...prevState.botMessageState,
          botQueue: true
        }
      }))
    }
    setTimeout(()=>this.onScroll())

  }

  botSendMessage() {
    const {messages} = this.state.botMessageState

    this.setState((prevState) => ({
      messages: [...prevState.messages, {
        author: 'bot',
        message:
          messages[Math.floor(Math.random() * messages.length)]
      }],
      botMessageState: {
        ...prevState.botMessageState,
        inProcess: false
      }
    }))
    this.onScroll();
  }

  componentDidUpdate(prevProps, prevState) {
    const {botQueue} = this.state.botMessageState
    const {inProcess} = prevState.botMessageState

    if (botQueue) {
      if (!inProcess) {
        this.setState((prevState) => ({
          botMessageState: {
            ...prevState.botMessageState,
            botQueue: false,
            inProcess: true
          }
        }))
        setTimeout(() => this.botSendMessage(), 1000)
      }
    }
  }

  render() {
    return (
      <Container maxWidth="sm">
        <MessageField
          messages={this.state.messages}
          onChange={this.onChange.bind(this)}
          onSend={this.onSend.bind(this)}
          inputValue={this.state.inputValue}
        />
      </Container>
    )
  }
}