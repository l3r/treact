import { Media } from 'containers';
import styled from 'glamorous';
import * as React from 'react';
import { MtpMessageMedia } from 'redux/mtproto';
import { Themeable } from 'themes/theme.h';

const StyledTime = styled.div<Themeable>(({ theme }) => ({
  marginRight: '1em',
  marginLeft: '1em',
  marginTop: 'auto',
  whiteSpace: 'nowrap',
  color: theme.msgInDateFg,
}));

const Body = styled.div<Themeable>(({ theme }) => ({
  backgroundColor: theme.msgInBg,
  borderRadius: '16px',
  float: 'left',
  fontSize: '13px',
  margin: '10px 36px 2px 7px',
  maxWidth: '404px',
  minWidth: '115px',
  padding: '7px 13px 8px 13px',
  wordWrap: 'break-word',
}));

const Text = styled.div<Themeable>(({ theme }) => ({
  color: theme.historyTextInFg,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  [`& pre, & code`]: {
    color: theme.msgInMonoFg,
  },
}));

const TextBody = styled.div({
  display: 'flex',
});

const sender = 'sender';
const Sender = styled.div<Themeable>(sender, ({ theme }) => ({
  color: theme.historyTextInFg,
  fontWeight: 600,
}));
Sender.toString = () => `.${sender}`;

const StyledMessage = styled.div({
  width: '100%',
  display: 'flex',
  [`&:not(:first-child) ${Sender}`]: {
    display: 'none',
  },
});

interface OwnProps {
  id: number;
  date: number;
  user: number;
  // TODO: Should be children?
  text: React.ReactNode;
  media?: MtpMessageMedia;
  own?: boolean;
}

const formatTime = (date: number) => {
  const dateObject = new Date(date * 1000);
  return {
    dateString: dateObject.toLocaleDateString(),
    timeString: dateObject.toLocaleTimeString(),
  };
};

type TimeProps = { date: number };
const Time = ({ date }: TimeProps) => {
  const { timeString } = formatTime(date);
  return (
    <StyledTime>
      <span>{timeString}</span>
    </StyledTime>
  );
};

export const Message = ({ user, date, text, media, own = false }: OwnProps) => {
  console.debug(`Message`, user, text, own);
  return (
    <StyledMessage>
      <Body>
        <Sender>{user}</Sender>
        <TextBody>
          <Text>
            {text}
            {media && <Media media={media} />}
          </Text>
          <Time date={date} />
        </TextBody>
      </Body>
    </StyledMessage>
  );
};
