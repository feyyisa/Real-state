import React from 'react';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton, 
  WhatsappShareButton, 
  TelegramShareButton 
} from 'react-share';
import { 
  FacebookIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  WhatsappIcon, 
  TelegramIcon 
} from 'react-share';
const SocialMediaShare = ({ url, title }) => {
  return (
    <div className="social-media-share flex justify-center space-x-4">
      {/* Facebook Share */}
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      {/* Twitter Share */}
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      {/* LinkedIn Share */}
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      {/* WhatsApp Share */}
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      {/* Telegram Share */}
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      {/* You can add more social media buttons in the same way */}
    </div>
  );
};

export default SocialMediaShare;
