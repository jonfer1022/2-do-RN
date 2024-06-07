import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackList = {
  AuthRoot: NavigatorScreenParams<AuthStackList>;
  // Auth: NavigatorScreenParams<AuthStackList>
  // LoginRoot: NavigatorScreenParams<LoginRootTabList>
  // Settings: NavigatorScreenParams<SettingsMenuList & AccountInfoList>
};

export type AuthStackList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ConfirmCode: {
    name: string;
    email: string;
    password: string;
  };
  HomeRoot: undefined;
};

export type HomeRootStackList = {
  Home: undefined;
  Search: undefined;
  // ContentSelected: {
  //   item: ISeries | IMovies;
  // };
  // SearchContent: undefined;
  // PlayVideo: undefined;
};
