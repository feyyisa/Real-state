import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon
} from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${window.location.origin}/property/${property._id}`;
  const title = `Check out this ${property.listingType === 'rent' ? 'rental' : 'property for sale'}: ${property.title}`;
  const description = `${property.description.substring(0, 100)}...`;

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold">Share this property</h3>
      <div className="flex space-x-2">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        
        <EmailShareButton url={shareUrl} subject={title} body={description}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;