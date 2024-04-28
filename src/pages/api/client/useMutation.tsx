import { useState } from "react";

interface IUseMutation {
  loading: boolean;
  data?: any;
  error?: any;
}

type IUseMutationResult = [(data: any) => void, IUseMutation];

export default function useMutation(url: string): IUseMutationResult {
  const [state, setState] = useState<IUseMutation>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => {
        setState((prev) => ({ ...prev, data }));
        if (data.location) {
          if (data.message) {
            alert(data.message); // { message: "User created successfully", location: "/login" }
          }
          window.location.href = data.location;
        }
      })
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}
