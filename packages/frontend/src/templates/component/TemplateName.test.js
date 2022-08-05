import { render, screen } from '@testing-library/react';
import { TemplateName } from './TemplateName';

const wrapper = () => render(<TemplateName />);

describe('<TemplateName />', () => {
  it('should render', () => {
    wrapper();
    expect(screen.getByText('TemplateName')).toBeDefined();
  });
});
