/*  eslint-disable */
import { render, screen, cleanup } from '@testing-library/react';
import CreatePlaylist from './';
import playlistService from 'services/playlist.service';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);
jest.mock('services/playlist.service');
jest.setTimeout(100000000);

describe('all playlist testing', () => {
  test('load create playlist form', () => {
    render(<CreatePlaylist />);
    expect(screen.getByTestId('create-playlist-ui-test'));
  });

  test('enter form values playlist', async () => {
    const { container, debug } = render(<CreatePlaylist onPlaylistTitleChange={() => {}} handleCreatePlaylistSubmit={() => {}} />);
    playlistService.create.mockResolvedValue({
      message: 'created successfully playlist ',
    });
    const title = container.querySelector(`input[name="playlistName"]`);
    const button = container.querySelector(`button[type="submit"]`);
    userEvent.type(title, 'unit test playlist title ');
    console.log(debug);
    userEvent.click(button);
    // expect(playlistService.create).toHaveBeenCalledTimes(1);
  });
});
