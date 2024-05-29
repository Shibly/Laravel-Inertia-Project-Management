<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ReplyResource extends JsonResource
{


    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reply' => $this->reply,
            'attachment_path' => $this->attachment_path && !(str_starts_with($this->attachment_path, 'http')) ?
                Storage::url($this->attachment_path) : $this->attachment_path,
            'replied_by' => new UserResource($this->whenLoaded('repliedBy')),
            'task_id' => $this->task_id,
            'created_at' => $this->created_at->format('Y-m-d g:i A'),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
