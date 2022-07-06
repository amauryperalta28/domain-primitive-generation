using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's IntegerId
/// </summary>
public sealed class IntegerId : AbstractPositiveIntegerPrimitive
{
	private static readonly PositiveInteger MinValue = new(1);
	private static readonly PositiveInteger MinValue = new(100);

	/// <summary>
	/// Creates an instance of <see cref="IntegerId"/>.
	/// <param name="rawValue"></param>
	/// </summary>
	public IntegerId(PositiveInteger rawValue) : base(rawValue, MinValue, MaxValue)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="IntegerId"/>.
	/// <param name="rawIntegerId">Represents a integerid.</param>
	/// <returns>An instance of <see cref="IntegerId"/></returns>
	/// </summary>
	public static IntegerId From(int rawIntegerId) => new(new PositiveInteger(rawIntegerId));

}
