import { notification } from 'antd';

const message = (messageText, success = false, config = {}) => {
	const messagesWrapper = document.querySelector('.ant-notification');
	let id;
	if (messagesWrapper) {
		const messages = messagesWrapper.children?.[0]?.children ?? [];
		const ids = Array.from(messages).map(messageElement => {
			const { classList } = messageElement;
			const idClassName = Array.from(classList).find(cls => cls.startsWith('custom_message_'));
			const splitArray = idClassName.split('custom_message_');
			const messageId = splitArray[splitArray.length - 1];
			if (!isNaN(messageId)) {
				return Number(messageId);
			}
			return 0;
		});
		ids.sort(function (a, b) {
			return a - b;
		});
		const lastId = ids[ids.length - 1];
		if (lastId) {
			id = lastId + 1;
		} else {
			id = 1;
		}
	} else {
		id = 1;
	}
	const key = `custom_message_${id}`;

	const className = `custom-toaster-container ${key} ${success ? 'success' : 'error'}`;

	notification.open({
		className,
		closeIcon: <div />,
		duration: success ? 10 : 0,
		message: messageText,
		key,
		onClick() {
			notification.close(key);
		},
		...config,
	});
};

export default message;
