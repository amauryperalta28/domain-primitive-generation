using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's PersonId
/// </summary>
public sealed class PersonId : AbstractGuidBasedIdPrimitive
{
	private PersonId(Guid rawId) : base(rawId)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="PersonId"/>.
	/// <param name="rawPersonId">Represents a personid.</param>
	/// <returns>An instance of <see cref="PersonId"/></returns>
	/// </summary>
	public static readonly PersonId From(Guid rawPersonId) => new(rawPersonId);

	/// <summary>
	/// Shortcut for constructor <see cref="PersonId"/>.
	/// <returns>An instance of <see cref="PersonId"/></returns>
	/// </summary>
	public static readonly PersonId Generate() => new(Guid.NewGuid());
}
