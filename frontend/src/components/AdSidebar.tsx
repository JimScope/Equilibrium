import React from 'react';

const AdSidebar: React.FC = () => {
  return (
    <div className="w-full lg:w-[300px] lg:min-w-[300px] p-4 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 mt-6 lg:mt-0">
      <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 10 }}>
        <iframe
          data-aa='2417795'
          src='//acceptable.a-ads.com/2417795/?size=Adaptive&title_color=070404&link_color=25b4e8'
          style={{
            border: 0,
            padding: 0,
            width: '100%',
            height: 'auto',
            overflow: 'hidden',
            display: 'block',
            margin: 'auto',
            minHeight: '250px' // Added min-height to ensure visibility
          }}
          title="Advertisement"
        ></iframe>
      </div>
    </div>
  );
};

export default AdSidebar;
