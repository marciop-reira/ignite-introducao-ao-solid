import { Request, Response } from "express";
import { z } from "zod";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const showUserProfileParams = z.object({
      user_id: z.string().uuid(),
    });
    const { user_id } = showUserProfileParams.parse(request.params);

    try {
      const user = this.showUserProfileUseCase.execute({
        user_id,
      });

      return response.json(user);
    } catch (error) {
      return response.status(404).json({
        error: error.message,
      });
    }
  }
}

export { ShowUserProfileController };
