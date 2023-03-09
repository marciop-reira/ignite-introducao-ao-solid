import { Response, Request } from "express";
import { z } from "zod";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string(),
    });
    const { name, email } = createUserBody.parse(request.body);

    try {
      const user = this.createUserUseCase.execute({ name, email });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}

export { CreateUserController };
