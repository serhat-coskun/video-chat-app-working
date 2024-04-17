import { backend } from "@config/index";



interface SigninSuccessResponse {
  token: string;
}

interface SigninFailureResponse {
  error: string;
}

type SignInResponse = SigninSuccessResponse | SigninFailureResponse;


export function isSigninSuccessResponse(response: SignInResponse): response is SigninSuccessResponse {
  return (response as SigninSuccessResponse).token !== undefined;
}

export function isSigninFailureResponse(response: SignInResponse): response is SigninFailureResponse {
  return (response as SigninFailureResponse).error !== undefined;
}


interface SignUpResponse {
  id: number;
  username: string;
  email: string;
  diamond_count: number;
  subscription_count: number;
}


interface InvalidTokenResponse {
  detail: string
}

interface ValidTokenResponse {
  alive: boolean;
}

type ValidateTokenResponse = InvalidTokenResponse | ValidTokenResponse;

export function isInvalidTokenResponse(response: ValidateTokenResponse): response is InvalidTokenResponse {
  return (response as InvalidTokenResponse).detail !== undefined;
}

export function isValidTokenResponse(response: ValidateTokenResponse): response is ValidTokenResponse {
  return (response as ValidTokenResponse).alive !== undefined;
}

export async function signin(username: string, password: string): Promise<SignInResponse> {
  console.log(backend.rest.base_url + backend.rest.signin_endpoint);
  
  console.log(JSON.stringify({ username, password }));
  

  const response = await fetch(backend.rest.base_url + backend.rest.signin_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  return response.json();
}

export async function signup(username: string, email: string, password: string): Promise<SignUpResponse> {
  const response = await fetch(backend.rest.base_url + backend.rest.signup_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}

export async function validateToken(token: string): Promise<ValidateTokenResponse> {
  const response = await fetch(backend.rest.base_url + backend.rest.validate_token_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({ token })
  });

  return response.json();
}