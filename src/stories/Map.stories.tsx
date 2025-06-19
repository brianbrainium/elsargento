import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Map from '../components/Map';

const meta: Meta<typeof Map> = {
  title: 'Map',
  component: Map,
};
export default meta;

export const Basic: StoryObj<typeof Map> = {
  name: 'Basic',
  render: () => <Map />,
};

export const Amenities: StoryObj<typeof Map> = {
  name: 'Amenities',
  render: () => {
    const [showParcel, setShowParcel] = React.useState(true);
    const [showAmenities, setShowAmenities] = React.useState(true);
    return (
      <div>
        <label style={{ position: 'absolute', zIndex: 1000 }}>
          <input
            type="checkbox"
            checked={showParcel}
            onChange={(e) => setShowParcel(e.target.checked)}
          />{' '}
          Show Parcel
        </label>
        <label style={{ position: 'absolute', left: '150px', zIndex: 1000 }}>
          <input
            type="checkbox"
            checked={showAmenities}
            onChange={(e) => setShowAmenities(e.target.checked)}
          />{' '}
          Show Amenities
        </label>
        <Map showParcel={showParcel} showAmenities={showAmenities} />
      </div>
    );
  },
};
