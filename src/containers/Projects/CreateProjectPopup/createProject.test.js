/*  eslint-disable */
import { render, screen, waitFor, cleanup, debug, wait } from '@testing-library/react';
// import UserEvent from '@testing-library/user-event';
import CreateProjectPopup from './';
import projectService from 'services/project.service';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import userEvent from '@testing-library/user-event';
// import authService from 'services/auth.service';

afterEach(cleanup);
jest.mock('services/project.service');
jest.setTimeout(100000000);

// const credentials = {
//   email: process.env.REACT_APP_SHARED_PROJECT_DEMO_USER,

//   password: process.env.REACT_APP_SHARED_PROJECT_DEMO_PASS,
//   domain: 'currikistudio',
// };

describe('all project testing', () => {
  test('load create project container with fake permission', () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateProjectPopup testCasePropPermission={true} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('create-project-ui-test'));
  });

  test('enter form values project', async () => {
    const { container, debug } = render(
      <Provider store={store}>
        <Router>
          <CreateProjectPopup testCasePropPermission={true} />
        </Router>
      </Provider>,
    );
    projectService.create.mockResolvedValue({
      message: 'created successfully qamar ',
    });
    projectService.visibilityTypes.mockResolvedValue();
    const title = container.querySelector(`input[name="name"]`);
    const description = container.querySelector(`textarea[name="description"]`);
    const button = container.querySelector(`button[type="submit"]`);
    userEvent.type(title, 'unit test project ');
    userEvent.type(description, 'unit test description ');
    userEvent.click(button);
    expect(projectService.create).toHaveBeenCalledTimes(1);
  });

  // test('login and create a project', async () => {
  //   jest.unmock('services/project.service');
  //   const login = await authService.login(credentials);
  //   const createProject = await projectService.create(
  //     {
  //       name: new Date(),
  //       description: 'this is test description',
  //       is_public: true,
  //       organization_visibility_type_id: 1,
  //       team_id: null,
  //       thumb_url: 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
  //     },
  //     1,
  //     login.access_token,
  //   );
  //   console.log(createProject);
  //   expect(createProject?.project.id).not.toBeUndefined;
  // });
});
