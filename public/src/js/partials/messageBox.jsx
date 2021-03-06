var ReplyBox = require('../components/replyBox');

var MessagesStore = require('../stores/messages')
var UserStore = require('../stores/user');

var Utils = require('../utils');
var _ = require('lodash');

var MessageBox = React.createClass({
	getInitialState: function () {
		return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID());
	},
	render: function () {
		var currentUserID = UserStore.user.id;

		var messages = this.state.messages.map(function (message, index) {
			var messageClasses = React.addons.classSet({
				'message-box__item': true,
				'message-box__item--from-current': message.from === currentUserID,
				'clear': true
			});

			return (
				<li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
					<div className="message-box__item__contents">
						{ message.contents }
					</div>
				</li>
			);
		});

		var lastMessage = _.last(this.state.messages);

		if (lastMessage.from === currentUserID) {
			if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
				var date = Utils.getShortDate(lastMessage.timestamp);
				messages.push(
					<li key="read" className="message-box__item message-box__item--read">
						<div className="message-box__item__contents">
							Read { date }
						</div>
					</li>
				);
			}
		}

		return (
			<div className="message-box">
				<ul className="message-box__list">
					{ messages }
				</ul>
				<ReplyBox />
			</div>
		);
	}
});

module.exports = MessageBox;