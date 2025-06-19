import type { Meta, StoryObj } from '@storybook/react';
import KmlViewer from '../pages/KmlViewer';

const meta: Meta<typeof KmlViewer> = {
  title: 'KmlViewer',
  component: KmlViewer,
};
export default meta;

export const SatelliteOutline: StoryObj<typeof KmlViewer> = {
  name: 'Satellite + Outline',
  render: () => <KmlViewer />,
};
