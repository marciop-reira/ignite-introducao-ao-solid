import { Request, Response } from "express";
import { z } from "zod";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    const turnUserAdminParams = z.object({
      user_id: z.string().uuid(),
    });
    const { user_id } = turnUserAdminParams.parse(request.params);

    try {
      const user = this.turnUserAdminUseCase.execute({
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

export { TurnUserAdminController };
